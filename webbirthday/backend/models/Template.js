// models/Template.js
import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    templateID: { type: String, required: true, unique: true }, // id riêng cho template
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // người tạo template
    imgURL: [{ type: String }], // ảnh preview
    fabricEdit: { type: String }, // chuỗi format từ fabric
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);
export default Template;
