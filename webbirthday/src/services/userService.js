import axios from "axios";

export const postCreateNewUser = (data) => {
  return axios.post("/api/users", data);
};
