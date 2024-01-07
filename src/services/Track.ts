import { Api } from "../api";

// const apiUrl = process.env.REACT_APP_API_URL;
const aiUrl = process.env.REACT_APP_AI_URL;

const getRecommendationsURL = `${aiUrl}/recommendations`;

export const getRecommendations = async (groupId: string) => {
  const response = await Api.get(`${getRecommendationsURL}?groupId=${groupId}`);

  return response.data;
};
