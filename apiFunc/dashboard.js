import axios from "axios";

const url = `${process.env.EXPO_PUBLIC_API_URL}/api/dashboard/`;

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
