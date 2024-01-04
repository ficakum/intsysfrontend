import { getCookie, removeCookie, setCookie } from "typescript-cookie";

import {
  ACCESS_CLIENT_TOKEN_KEY,
  ACCESS_USER_TOKEN_KEY,
  GET_USERS_API_URL,
  HEADERS_CONTENT_TYPE_FORM_URLENCODED,
  REFRESH_TOKEN_KEY,
} from "../constants/auth";
import { Api } from "../api";
// import { IAuthUser, IUser } from "../models";

const apiUrl = process.env.REACT_APP_API_URL;

const headersContentTypeFormUrlencoded = HEADERS_CONTENT_TYPE_FORM_URLENCODED;

// const redirectUri = `${clientUrl}authorized`;

// const loginClientUrl = `${apiUrl}oauth/token`;
// const loginUserUrl = `${apiUrl}oauth/token`;
const refreshUserAccessTokenUrl = `${apiUrl}oauth/token`;

const getLoggedInUserUrl = GET_USERS_API_URL;

export const signInUser = () => {
  return;
};

export const refreshUserAccessToken = async () => {
  const refreshToken = getCookie(REFRESH_TOKEN_KEY) as string;

  const params = new URLSearchParams();
  params.append("refresh_token", refreshToken);

  const response = await Api.post(refreshUserAccessTokenUrl, params, {
    headers: {
      "Content-type": headersContentTypeFormUrlencoded,
    },
  });
  removeCookie(REFRESH_TOKEN_KEY);
  const newAccessUserToken = response.data.access_token;
  const newRefreshToken = response.data.refresh_token;
  setCookie(ACCESS_USER_TOKEN_KEY, newAccessUserToken);
  setCookie(REFRESH_TOKEN_KEY, newRefreshToken);
  return await response.data;
};

export const getLoggedInUser = async () => {
  const response = await Api.get(getLoggedInUserUrl);
  return response.data;
};

export const getIsAuthenticated = () => {
  return !!getCookie(ACCESS_USER_TOKEN_KEY);
};

export const clearSession = () => {
  removeCookie(ACCESS_CLIENT_TOKEN_KEY);
  removeCookie(ACCESS_USER_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
};
