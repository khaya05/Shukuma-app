import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    select: false,
  },
  verificationCodeExpires: {
    type: Date,
    select: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  authProvider: {
    type: String,
    enum: ['email', 'google'],
    default: 'email',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
}

export default mongoose.model('User', UserSchema);
