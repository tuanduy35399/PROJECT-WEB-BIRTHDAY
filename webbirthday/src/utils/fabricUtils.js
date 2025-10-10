// utils/fabricUtils.js

/**
 * Thêm _url vào các image object trong Fabric JSON,
 * để khi save/update chỉ gửi URL cũ thay vì Base64
 */
export function preserveImageUrls(fabricJson) {
  if (!fabricJson || !fabricJson.objects) return fabricJson;

  fabricJson.objects.forEach((obj) => {
    if (obj.type === "image" && obj.src && !obj.src.startsWith("http")) {
      obj._url = obj.src; // lưu URL cũ
    }
  });

  return fabricJson;
}
