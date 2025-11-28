import { Router } from 'express';
import {
  googleAuth,
  login,
  logout,
  register,
  resendVerificationCode,
  verifyEmail,
} from '../controllers/authController.js';
import {
  validateLoginUser,
  validateRegisterUser,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/login', validateLoginUser, login);
router.post('/register', validateRegisterUser, register);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationCode);
router.post('/google', googleAuth);
router.get('/logout', logout);

export default router;
