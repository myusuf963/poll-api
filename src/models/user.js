import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import mongooseHidden from 'mongoose-hidden';
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 50,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 8,
    maxLength: 30,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character',
    ],
  },
  createdAt: { type: Date, required: true, default: Date.now, immutable: true },
  updatedAt: { type: Date, required: true, default: Date.now },
});
//eslint-disable-next-line
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  next();
});
//eslint-disable-next-line
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if (
    this.isModified('password') &&
    this.password !== this._passwordConfirmation
  ) {
    this.invalidate('passwordConfirmation', 'This must match your password');
  }
  next();
});
userSchema.plugin(uniqueValidator);
userSchema.plugin(
  mongooseHidden({ defaultHidden: { password: true, email: true } })
);

export default mongoose.model('User', userSchema);
