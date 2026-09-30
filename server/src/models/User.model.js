import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    picture: {
      type: String,
      default: "",
    },
    aiRequestsCount: {
      type: Number,
      default: 0,
    },
    lastAiRequestDate: {
      type: Date,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    featureUsage: {
      type: Map,
      of: Date,
      default: {}
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;