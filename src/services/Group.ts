import { Api } from "../api";
import { IGroup } from "../models";

const apiUrl = process.env.REACT_APP_API_URL;
const aiUrl = process.env.REACT_APP_AI_URL;

const getGroupsUrl = `${aiUrl}group_recommendations/`;
const predictGroupClusterUrl = `${aiUrl}predict_group_cluster/`;
const createGroupsUrl = `${apiUrl}v1/groups/`;

export const getGroupsRecommendation = async (userId: string) => {
  const response = await Api.get(`${getGroupsUrl}${userId}`);

  return response.data;
};

export const predictGroupCluster = async (groupId: string) => {
  const response = await Api.put(`${predictGroupClusterUrl}${groupId}`);
  console.log(response);
};

export const createGroup = async (group: Partial<IGroup>) => {
  const response = await Api.post(`${createGroupsUrl}`, group);

  predictGroupCluster(response.data._id);

  return response.data;
};

export const leaveGroup = async (groupId: string) => {
  await Api.post(`${apiUrl}v1/groups/${groupId}/leave`);
};

export const joinGroup = async (groupId: string) => {
  await Api.post(`${apiUrl}v1/groups/${groupId}/join`);
};
