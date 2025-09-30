// models/Template.js
import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    // ❌ bỏ templateID
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imgURL: [{ type: String }],
    fabricEdit: { type: String },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);
export default Template;
