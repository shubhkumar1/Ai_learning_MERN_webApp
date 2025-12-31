const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classLevel: { type: Number, required: true }, // 1-12
  personaPreference: { type: String, enum: ['teacher', 'friend'], default: 'teacher' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);