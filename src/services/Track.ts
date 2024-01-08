import { Api } from "../api";
import { ITrack } from "../models";

const apiUrl = process.env.REACT_APP_API_URL;
const aiUrl = process.env.REACT_APP_AI_URL;

const getRecommendationsURL = `${aiUrl}/recommendations`;
const createTrackURL = `${apiUrl}v1/trackUnits/track`;

export const getRecommendations = async (groupId: string) => {
  const response = await Api.get(`${getRecommendationsURL}?groupId=${groupId}`);

  return response.data;
};

export const addSong = async (track: ITrack) => {
  const response = await Api.post(`${createTrackURL}`, track);

  return response.data;
};
