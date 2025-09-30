// models/Card.js
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    // ❌ bỏ cardID
    cardName: { type: String, required: true },
    isEditable: { type: Boolean, default: true },
    imgURL: [{ type: String }],
    cardDESC: { type: String },
    fabricEdit: { type: Object },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
