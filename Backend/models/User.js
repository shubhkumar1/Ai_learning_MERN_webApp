const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classLevel: { type: Number, required: true }, // 1-12
  personaPreference: { type: String, enum: ['teacher', 'friend'], default: 'teacher' },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  googleId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);