import { asyncWrapper } from '../util/asyncWrapper.js';
import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import {
  comparePassword,
  generateVerificationCode,
  hashPassword,
} from '../util/passwordUtil.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createToken } from '../util/tokenUtils.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../services/emailService.js';

export const register = asyncWrapper(async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  const verificationCode = generateVerificationCode();
  const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
  req.body.password = hashedPassword;
  const user = await User.create({
    ...req.body,
    verificationCode,
    verificationCodeExpires,
    authProvider: 'email',
  });

  try {
    await sendVerificationEmail(req.body.email, verificationCode);
  } catch (error) {
    console.error('Failed to send verification email', error);
  }

  const token = createToken({ userId: user._id });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  res.status(StatusCodes.CREATED).json({
    message: 'Registration successful. Check your email for verification code.',
    token,
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
    },
  });
});

export const verifyEmail = asyncWrapper(async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Email and verification code are required' });
  }

  const user = await User.findOne({ email }).select(
    '+verificationCode +verificationCodeExpires'
  );

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' });
  }

  if (user.emailVerified) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Email already verified.' });
  }

  if (user.verificationCodeExpires < new Date()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Verification code has expired' });
  }

  if (user.verificationCode !== code) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid verification code' });
  }

  user.emailVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpires = undefined;

  await user.save();

  try {
    await sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }

  res.status(200).json({
    success: true,
    message: 'Email verified successfully',
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
    },
  });
});

export const authenticateUser = (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) throw new UnauthenticatedError('authentication invalid');

  try {
    const { userId } = verifyJWT(token);
    req.userId = userId; 
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const resendVerificationCode = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Email is required' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' });
  }

  if (user.emailVerified) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Email is already verified' });
  }

  const verificationCode = generateVerificationCode();
  const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

  user.verificationCode = verificationCode;
  user.verificationCodeExpires = verificationCodeExpires;
  await user.save();

  try {
    await sendVerificationEmail(email, verificationCode);
  } catch (error) {
    console.error('Failed to send verification email:', error);
  }

  res.status(200).json({
    success: true,
    message: 'Verification code sent to your email',
  });
});

export const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await comparePassword(password, user.password))) {
    throw new UnauthenticatedError('invalid credentials');
  }

  if (!user.emailVerified) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: 'Please verify your email first',
      requiresVerification: true,
      email: user.email,
    });
  }

  const token = createToken({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  res.status(StatusCodes.OK).json({
    msg: 'user logged in',
    token,
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
    },
  });
});

export const googleAuth = asyncWrapper(async (req, res) => {
  const { googleId, name, email } = req.body;

  if (!googleId || !email || !name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Missing required Google data (googleId, name, email)',
    });
  }

  let user = await User.findOne({
    $or: [{ googleId }, { email }],
  });

  if (user) {
    if (!user.googleId) {
      user.googleId = googleId;
      user.emailVerified = true;
      await user.save();
    }
  } else {
    user = await User.create({
      name,
      email,
      googleId,
      emailVerified: true,
      authProvider: 'google',
    });
  }

  const token = createToken({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Google authentication successful',
    token,
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      authProvider: user.authProvider,
    },
  });
});

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
}