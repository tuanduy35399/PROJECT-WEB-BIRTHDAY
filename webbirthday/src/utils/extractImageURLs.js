// utils/extractImageURLs.js
export function extractImageURLs(fabricEditObj) {
  if (!fabricEditObj || !fabricEditObj.objects) return [];

  const urls = fabricEditObj.objects
    .filter((obj) => obj.type === "image" && obj.src)
    .map((obj) => obj.src);

  return Array.from(new Set(urls)); // loại bỏ trùng lặp
}
