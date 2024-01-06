import { Api } from "../api";

const apiUrl = process.env.REACT_APP_API_URL;

const getGroupsUrl = `${apiUrl}v1/groups/`;

export const getGroups = async (page: number, limit: number) => {
  const response = await Api.get(
    `${getGroupsUrl}?$page=${page}&$limit=${limit}`
  );

  return response.data;
};
