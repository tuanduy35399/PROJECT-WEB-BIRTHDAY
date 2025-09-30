// utils/processFabricEdit.js
import { uploadBase64Image } from "./cloudinaryUpload.js";

export const processFabricEditImages = async (fabricEdit) => {
  // fabricEdit là object (parsed JSON)
  // fabricEdit.objects là mảng các đối tượng trong canvas fabric

  if (!fabricEdit || !fabricEdit.objects) return fabricEdit;

  // Mảng lưu url ảnh để cập nhật imgURL
  const imgURLs = [];

  // Duyệt tất cả các đối tượng
  for (const obj of fabricEdit.objects) {
    if (obj.type === "image" && obj.src) {
      const src = obj.src;

      // Nếu src là base64 (dạng data:image/...), upload lên Cloudinary
      if (src.startsWith("data:image")) {
        try {
          const url = await uploadBase64Image(src);
          obj.src = url; // cập nhật lại src trong fabricEdit
          imgURLs.push(url);
        } catch (err) {
          console.error("Upload image error:", err);
          // Có thể bỏ qua hoặc ném lỗi tùy bạn
        }
      } else {
        // Nếu src đã là URL, thêm vào mảng luôn
        imgURLs.push(src);
      }
    }
  }

  return {
    fabricEdit,
    imgURLs,
  };
};
