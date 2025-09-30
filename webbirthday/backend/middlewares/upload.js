// middlewares/upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fabric_images", // thư mục ảnh trên Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});

const parser = multer({ storage });

export default parser;
