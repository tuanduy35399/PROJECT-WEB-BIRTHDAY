import axios from "../utils/axiosCustomize.js";

const API_URL = "api/cards";

export const getCards = () => {
  return axios.get(API_URL);
};
export const getCardById = (id) => axios.get(`${API_URL}/${id}`);
export const createCard = (data) => axios.post(API_URL, data);
export const updateCard = (id, data) => axios.put(`${API_URL}/${id}`, data);
// nếu sau này có thêm create/update/delete thì viết tiếp ở đây
