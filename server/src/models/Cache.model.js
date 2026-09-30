import mongoose from "mongoose";

const cacheSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true
  },
  result: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h' // MongoDB TTL index to auto-delete after 24h
  }
});

const Cache = mongoose.model("Cache", cacheSchema);

export default Cache;
