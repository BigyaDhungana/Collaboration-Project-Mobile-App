import axios from "axios";

// const url = "http://192.168.18.135:8000/";
const url = `${process.env.EXPO_PUBLIC_API_URL}/users/`;

export const signupApi = async (data) => {
  const response = await axios.post(`${url}register/`, data);
  return response;
};

export const loginApi = async (data) => {
  // console.log("data", data);
  try {
    const response = await axios.post(`${url}login/`, data);
    return response;
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};

export const metadataApi = async (token) => {
  const response = await axios.get(`${url}metadata/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const logoutApi = async (token) => {
  const response = await axios.delete(`${url}logout/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};
