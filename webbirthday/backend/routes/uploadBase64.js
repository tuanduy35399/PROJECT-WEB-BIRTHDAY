import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { base64 } = req.body;
    if (!base64) return res.status(400).json({ message: "Thiếu dữ liệu ảnh" });

    const uploadRes = await cloudinary.uploader.upload(base64, {
      folder: "fabric_images",
    });

    res.json({ url: uploadRes.secure_url });
  } catch (error) {
    console.error("Upload thất bại:", error);
    res.status(500).json({ message: "Upload thất bại", error: error.message });
  }
});

export default router;
