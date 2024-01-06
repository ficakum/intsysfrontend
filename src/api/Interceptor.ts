import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

import { clearSession, refreshUserAccessToken } from "../services/Auth";
import {
  ACCESS_USER_TOKEN_KEY,
  INVALID_ACCESS_TOKEN_DESCRIPTION,
  INVALID_REFRESH_TOKEN_DESCRIPTION,
  REDIRECT_LOGOUT_KEY,
} from "../constants/auth";
import { ROUTES } from "../constants/routes";
import { ResponseErrorData } from "../models";

export const Interceptor = (axios: AxiosInstance) => {
  // REQUESTS
  axios.interceptors.request.use(
    (config) => {
      const accessUserToken = getCookie(ACCESS_USER_TOKEN_KEY);
      console.log(accessUserToken);

      if (accessUserToken) {
        config.headers.Authorization = `Bearer ${accessUserToken}`;
      }

      console.log(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // RESPONSES
  const responseInterceptor = axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (responseError: AxiosError) => {
      const { response } = responseError;

      if (response?.status === 401) {
        return handleUnauthorizedErrors(responseError);
      }

      return Promise.reject(responseError);
    }
  );

  const handleUnauthorizedErrors = (responseError: AxiosError) => {
    const { status, message } = responseError.response
      ?.data as ResponseErrorData;

    if (message.includes(INVALID_ACCESS_TOKEN_DESCRIPTION)) {
      return handleExpiredAccessToken(responseError.config);
    }

    if (status === 401 && message.includes(INVALID_REFRESH_TOKEN_DESCRIPTION)) {
      return handleExpiredRefreshToken();
    }
  };
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const handleExpiredAccessToken = async (originalRequest: any) => {
    axios.interceptors.response.eject(responseInterceptor);

    removeCookie(ACCESS_USER_TOKEN_KEY);

    const response = await refreshUserAccessToken();
    const { access_token } = response;
    originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
    return await axios(originalRequest);
  };

  const handleExpiredRefreshToken = () => {
    clearSession();
    setCookie(REDIRECT_LOGOUT_KEY, true);
    window.location.assign(ROUTES.AUTH.PATH);
  };

  return axios;
};
