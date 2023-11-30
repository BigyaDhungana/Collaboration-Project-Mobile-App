import axios from "axios";

const url = `${process.env.EXPO_PUBLIC_API_URL}/api/todos/`;

export const getTodoListApi = async (token, data) => {
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

export const addTodoApi = async (token, data) => {
  const response = await axios.post(url, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};

export const deleteTodoApi = async (token, data) => {
  const response = await axios.delete(url, {
    data: data,
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};

export const updataTodoApi = async (token, data) => {
  //data={todo:teamid,status:0,1,2}
  console.log(token, data);
  const response = await axios.patch(url, data, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};
