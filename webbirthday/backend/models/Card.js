import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    cardID: { type: String, required: true, unique: true }, // custom ID
    cardName: { type: String, required: true },
    isEditable: { type: Boolean, default: true },
    imgURL: [{ type: String }],
    cardDESC: { type: String },
    fabricEdit: { type: Object }, // JSON object từ FabricJS
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // đã có createdAt + updatedAt
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
