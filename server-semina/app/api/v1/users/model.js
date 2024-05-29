const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama harus diisi'],
  },
  email: {
    type: String,
    required: [true, 'Email harus diisi']
  },
  password: {
    type: String,
    required: [true, 'Password harus diisi'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'organizer', 'owner'],
    default: 'admin',
  },
  organizer: {
    type: mongoose.Types.ObjectId,
    ref: 'Organizer',
    required: true,
  },
}, {
  timestamps: true
});

usersSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

usersSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', usersSchema);