// src/services/uploadServices.js
import axios from "../utils/axiosCustomize.js";

export const uploadBase64Image = async (base64) => {
  const response = await axios.post("/api/upload-base64", { base64 });
  return response.data; // { url: "https://res.cloudinary.com/..." }
};
