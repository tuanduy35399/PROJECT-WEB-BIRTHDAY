import axios from "../utils/axiosCustomize.js";

const API_URL = "api/templates";

export const getTemplates = () => axios.get(API_URL);
