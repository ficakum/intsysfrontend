import { Api } from "../api";
import { ITrack } from "../models";

const apiUrl = process.env.REACT_APP_API_URL;
const aiUrl = process.env.REACT_APP_AI_URL;

const getRecommendationsURL = `${aiUrl}song_recommendations`;
const getLyricsURL = `${aiUrl}lyrics`;
const createTrackURL = `${apiUrl}v1/trackUnits/track`;
const getTrackInfosURL = `${apiUrl}v1/trackUnits/trackInfo`;

export const getRecommendations = async (groupId: string) => {
  const response = await Api.get(`${getRecommendationsURL}/${groupId}`);

  return response.data;
};

export const getTrackInfos = async (
  page?: number,
  limit?: number,
  name?: string,
  author?: string
) => {
  let nameQuery;
  let authorQuery;
  let pageQuery;
  let limitQuery;
  name ? (nameQuery = `&name=${name}`) : (nameQuery = "");
  author ? (authorQuery = `&author=${author}`) : (authorQuery = "");
  page ? (pageQuery = `?$page=${page}`) : (pageQuery = "?page=1");
  limit ? (limitQuery = `&$limit=${limit}`) : (limitQuery = "&limit=0");
  const response = await Api.get(
    `${getTrackInfosURL}${pageQuery}${limitQuery}${nameQuery}${authorQuery}`
  );

  return response.data;
};

export const addSong = async (track: ITrack) => {
  const response = await Api.post(`${createTrackURL}`, track);

  return response.data;
};

export const getLyrics = async (trackId: string) => {
  const response = await Api.get(`${getLyricsURL}/${trackId}`);

  return response.data ? response.data : { id: "", text: "", segments: [] };
};
