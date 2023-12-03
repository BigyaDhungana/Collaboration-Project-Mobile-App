import axios from "axios";

const url = `http://134.209.145.74:8000/api/dashboard/`;

export const dashboardApi = async (token) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(new Error(error.response.status));
  }
};
