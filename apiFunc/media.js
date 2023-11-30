import axios from "axios";

const url = `${process.env.EXPO_PUBLIC_API_URL}/cdn/project-media/`;

export const getMediaListApi = async (token, data) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
      params: data,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadMediaApi = async (token, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Token ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMediaApi = async (token, data) => {
  const response = await axios.delete(url, {
    headers: { Authorization: `Token ${token}` },
    data: data,
  });
  return response;
};
