import { Api } from "../api";

const apiUrl = process.env.REACT_APP_API_URL;

const getGroupsUrl = `${apiUrl}v1/groups/`;

export const getGroups = async (page: number, limit: number) => {
  const params: URLSearchParams = new URLSearchParams();
  params.append("$page", page.toString());
  params.append("$limit", limit.toString());
  const response = await Api.post(getGroupsUrl);

  return response.data;
};
