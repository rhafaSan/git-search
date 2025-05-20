import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

export const getUser = async (username: string) => {
  const response = await axiosClient.get(`/users/${username}`);
  return response.data;
};

export const getUserRepos = async (username: string) => {
  const response = await axiosClient.get(`/users/${username}/repos`);
  return response.data;
};

export const getStarredRepos = async (username: string) => {
  const response = await axiosClient.get(`/users/${username}/starred`);
  return response.data;
};

export default axiosClient;
