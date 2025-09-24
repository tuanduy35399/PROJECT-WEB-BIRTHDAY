import axios from "../utils/axiosCustomize.js";

const API_URL = "api/users";

export const getUsers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const updateUserStatus = async (id, isActive) => {
  const res = await axios.put(`${API_URL}/${id}`, { isActive });
  return res.data.user;
};

export const postCreateNewUser = async (payload) => {
  return await axios.post(API_URL, payload);
};

export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};
