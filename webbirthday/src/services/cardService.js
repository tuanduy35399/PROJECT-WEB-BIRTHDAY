import axios from "../utils/axiosCustomize.js";

const API_URL = "api/cards";

export const getCards = () => {
  return axios.get(API_URL);
};
export const createCard = (data) => axios.post(API_URL, data);
// nếu sau này có thêm create/update/delete thì viết tiếp ở đây
