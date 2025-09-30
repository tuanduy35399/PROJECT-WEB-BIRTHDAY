// src/services/templateServices.js
import axios from "../utils/axiosCustomize.js";

const API_URL = "/api/templates";

// [GET] tất cả template
export const getTemplates = () => axios.get(API_URL);

// [GET] theo id
export const getTemplateById = (id) => axios.get(`${API_URL}/${id}`);

// [POST] tạo mới
export const createTemplate = (data) => axios.post(API_URL, data);

// [PUT] cập nhật
export const updateTemplate = (id, data) => axios.put(`${API_URL}/${id}`, data);
