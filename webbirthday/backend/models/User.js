// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    // ❌ bỏ userID
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
