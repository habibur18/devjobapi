import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Generate JWT tokens
userSchema.methods.generateTokens = function () {
  const accessToken = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

  const refreshToken = jwt.sign({ userId: this._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

  this.accessToken = accessToken;
  this.refreshToken = refreshToken;
};

export const UserModel = mongoose.models.User ?? mongoose.model("User", userSchema);
