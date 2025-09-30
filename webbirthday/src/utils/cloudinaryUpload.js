// utils/cloudinaryUpload.js
import cloudinary from "../config/cloudinary.js";

export const uploadBase64Image = async (base64String) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(base64String, {
      folder: "fabric_images", // folder trên Cloudinary bạn muốn lưu
    });
    return uploadResponse.secure_url; // trả về link ảnh
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
