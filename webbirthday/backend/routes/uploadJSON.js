import express from "express";
import multer from "multer";
import { uploadFileToCloud } from "../utils/uploadFabricJSON.js";

const upload = multer(); // dùng memory storage
const router = express.Router();

router.post("/upload-json", upload.single("file"), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const result = await uploadFileToCloud(buffer, "fabric_json");
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
