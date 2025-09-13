import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  cardID: { type: String, required: true, unique: true },
  cardName: { type: String, required: true },
  isEditable: { type: Boolean, default: true },
  imgURL: [{ type: String }],
  lastEdit: { type: Date, default: Date.now },
  cardDESC: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // user sở hữu
}, { timestamps: true });

const Card = mongoose.model("Card", cardSchema);
export default Card;
