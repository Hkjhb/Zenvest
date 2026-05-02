const { Schema } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  authToken: {
    type: String,
    default: null,
  },
  openingBalance: {
    type: Number,
    default: 50000,
  },
  cashBalance: {
    type: Number,
    default: 50000,
  },
  realBalance: {
    type: Number,
    default: 0,
  },
});

module.exports = { UserSchema };
