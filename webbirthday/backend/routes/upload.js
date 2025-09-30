// routes/upload.js
import express from "express";
import parser from "../middlewares/upload.js";

const router = express.Router();

router.post("/upload-image", parser.single("image"), (req, res) => {
  try {
    // req.file.path là URL ảnh trên Cloudinary
    return res.json({ url: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload thất bại" });
  }
});

export default router;
