import { Api } from "../api";
import { IGroup } from "../models";

const apiUrl = process.env.REACT_APP_API_URL;
const aiUrl = process.env.REACT_APP_AI_URL;

const getGroupsRecommendationUrl = `${aiUrl}group_recommendations/`;
const predictGroupClusterUrl = `${aiUrl}predict_group_cluster/`;
const createGroupsUrl = `${apiUrl}v1/groups/`;
const getGroupsUrl = `${apiUrl}v1/groups/`;

export const getGroups = async (
  page?: number,
  limit?: number,
  groupName?: string
) => {
  let nameQuery;
  let pageQuery;
  let limitQuery;
  groupName ? (nameQuery = `&groupName=${groupName}`) : (nameQuery = "");
  page ? (pageQuery = `?$page=${page}`) : (pageQuery = "?page=1");
  limit ? (limitQuery = `&$limit=${limit}`) : (limitQuery = "&limit=0");

  const response = await Api.get(
    `${getGroupsUrl}${pageQuery}${limitQuery}${nameQuery}`
  );

  return response.data;
};

export const getGroupsRecommendation = async (userId: string) => {
  const response = await Api.get(`${getGroupsRecommendationUrl}${userId}`);
  return response.data;
};

export const predictGroupCluster = async (groupId: string) => {
  await Api.put(`${predictGroupClusterUrl}${groupId}`);
};

export const createGroup = async (group: Partial<IGroup>) => {
  const response = await Api.post(`${createGroupsUrl}`, group);
  return response.data;
};

export const leaveGroup = async (groupId: string) => {
  await Api.post(`${apiUrl}v1/groups/${groupId}/leave`);
};

export const joinGroup = async (groupId: string) => {
  await Api.post(`${apiUrl}v1/groups/${groupId}/join`);
};
