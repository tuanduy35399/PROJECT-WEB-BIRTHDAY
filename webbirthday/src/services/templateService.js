import axios from "axios";

const API_URL = "http://localhost:5000/api/templates";

export const getTemplates = () => axios.get(API_URL);
