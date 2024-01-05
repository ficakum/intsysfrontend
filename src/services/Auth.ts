import { getCookie, removeCookie, setCookie } from "typescript-cookie";

import {
  ACCESS_USER_TOKEN_KEY,
  HEADERS_CONTENT_TYPE_FORM_URLENCODED,
  REFRESH_TOKEN_KEY,
} from "../constants/auth";
import { Api } from "../api";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const headersContentTypeFormUrlencoded = HEADERS_CONTENT_TYPE_FORM_URLENCODED;

const signinUserUrl = `${apiUrl}v1/authentication/signin`;
const signupUserUrl = `${apiUrl}v1/authentication/signup`;
const refreshUserAccessTokenUrl = `${apiUrl}v1/authentication/refresh-token`;

export const getLoggedInUser = async () => {
  return {
    email: "",
    username: "",
    group: "",
    id: "",
  };
};

export const signInUser = async (username: string, password: string) => {
  const postData = {
    userName: username,
    password,
  };

  const response = await Api.post(signinUserUrl, postData, {
    headers: {
      "Content-type": headersContentTypeFormUrlencoded,
    },
  });

  const newAccessUserToken = response.data.access_token;
  const newRefreshToken = response.data.refresh_token;
  setCookie(ACCESS_USER_TOKEN_KEY, newAccessUserToken);
  setCookie(REFRESH_TOKEN_KEY, newRefreshToken);
};

export const signUpUser = async (
  username: string,
  password: string,
  email: string
) => {
  const postData = {
    userName: username,
    password,
    email,
  };

  const response = await Api.post(signupUserUrl, postData, {
    headers: {
      "Content-type": headersContentTypeFormUrlencoded,
    },
  });

  const newAccessUserToken = response.data.access_token;
  const newRefreshToken = response.data.refresh_token;
  setCookie(ACCESS_USER_TOKEN_KEY, newAccessUserToken);
  setCookie(REFRESH_TOKEN_KEY, newRefreshToken);

  return await response.data;
};

export const resetPassword = async (username: string, newPassword: string) => {
  const postData = {
    userName: username,
    newPassword,
  };

  const response = await Api.post(signinUserUrl, postData, {
    headers: {
      "Content-type": headersContentTypeFormUrlencoded,
    },
  });

  return response.status;
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

export const getIsAuthenticated = () => {
  return !!getCookie(ACCESS_USER_TOKEN_KEY);
};

export const clearSession = () => {
  removeCookie(ACCESS_USER_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
};
