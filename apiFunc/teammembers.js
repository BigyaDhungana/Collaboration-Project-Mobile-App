import axios from "axios";

const url = `${process.env.EXPO_PUBLIC_API_URL}/api/team-members/`;

export const getTeamMembersApi = async (token, data) => {
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
