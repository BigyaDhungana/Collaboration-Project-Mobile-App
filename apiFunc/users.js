import axios from "axios";

const url = `${process.env.EXPO_PUBLIC_API_URL}/users/`;

export const loginApi = async (data) => {
  try {
    const response = await axios.post(`${url}login/`, data);
    return response;
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};

export const metadataApi = async (token) => {
  try {
    const response = await axios.get(`${url}metadata/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(new Error(error.response.status));
  }
};

export const logoutApi = async (token) => {
  const response = await axios.delete(`${url}logout/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};
