// backend/utils/processFabricEdit.js
import cloudinary from "../config/cloudinary.js";

export const processFabricEditImages = async (fabricEdit) => {
  if (!fabricEdit || !fabricEdit.objects) return { fabricEdit, imgURLs: [] };

  const imgURLs = [];

  for (const obj of fabricEdit.objects) {
    if (obj.type === "image" && obj.src) {
      const src = obj.src;
      // Nếu là ảnh base64, upload lên Cloudinary
      if (src.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(src, {
            folder: "fabric_images",
          });
          obj.src = uploadResponse.secure_url;
          imgURLs.push(uploadResponse.secure_url);
        } catch (err) {
          console.error("Upload image error:", err);
        }
      } else {
        imgURLs.push(src);
      }
    }
  }

  return { fabricEdit, imgURLs };
};
