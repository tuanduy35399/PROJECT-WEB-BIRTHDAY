import axios from "../utils/axiosCustomize.js";

const API_URL = "api/cards";

export const getCards = () => {
  return axios.get(API_URL);
};

// nếu sau này có thêm create/update/delete thì viết tiếp ở đây
