import axios from "axios";

const API_URL = "http://localhost:5000/api/cards";

export const getCards = () => {
  return axios.get(API_URL);
};

// nếu sau này có thêm create/update/delete thì viết tiếp ở đây
