import axios from "axios";

const url = `${process.env.EXPO_PUBLIC_API_URL}/cdn/documents/`;

export const getDocumentListApi = async (token, data) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
      params: data,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(new Error(error.response.status));
  }
};

export const uploadDocumentApi = async (token, data) => {
  const response = await axios.post(url, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};

export const deleteDocumentApi = async (token, data) => {
  const response = await axios.delete(url, {
    headers: { Authorization: `Token ${token}` },
    data: data,
  });
  return response;
};

export const getDocumentBody = async (token, data) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Token ${token}` },
      params: data,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(new Error(error.response.status));
  }
};
