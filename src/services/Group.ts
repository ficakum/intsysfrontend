import { Api } from "../api";

const apiUrl = process.env.REACT_APP_API_URL;

const getGroupsUrl = `${apiUrl}v1/groups/`;

export const getGroups = async (page: number, limit: number) => {
  const response = await Api.get(
    `${getGroupsUrl}?$page=${page}&$limit=${limit}`
  );

  return response.data;
};

export const leaveGroup = async (groupId: string) => {
  await Api.post(`${apiUrl}v1/groups/${groupId}/leave`);
};

export const joinGroup = async (groupId: string) => {
  await Api.post(`${apiUrl}v1/groups/${groupId}/join`);
};
