import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

import { clearSession, refreshUserAccessToken } from "services/Auth";
import {
  ACCESS_USER_TOKEN_KEY,
  INVALID_ACCESS_TOKEN_DESCRIPTION,
  INVALID_REFRESH_TOKEN_DESCRIPTION,
  INVALID_TOKEN,
  REDIRECT_LOGOUT_KEY,
} from "../constants/auth";
import { ROUTES } from "constants/routes";
import { IAuthUser, ResponseErrorData } from "models";

export const Interceptor = (axios: AxiosInstance) => {
  // REQUESTS
  axios.interceptors.request.use(
    (config) => {
      const accessUserToken = getCookie(ACCESS_USER_TOKEN_KEY);

      if (accessUserToken) {
        config.headers.Authorization = `Bearer ${accessUserToken}`;
      }

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
    const { error, error_description } = responseError.response
      ?.data as ResponseErrorData;

    if (
      error === INVALID_TOKEN &&
      error_description.includes(INVALID_ACCESS_TOKEN_DESCRIPTION)
    ) {
      return handleExpiredAccessToken(responseError.config);
    }

    if (
      error === INVALID_TOKEN &&
      error_description.includes(INVALID_REFRESH_TOKEN_DESCRIPTION)
    ) {
      return handleExpiredRefreshToken();
    }
  };
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const handleExpiredAccessToken = (originalRequest: any) => {
    axios.interceptors.response.eject(responseInterceptor);

    removeCookie(ACCESS_USER_TOKEN_KEY);

    return refreshUserAccessToken().then((response: IAuthUser) => {
      const { access_token } = response;

      originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

      return axios(originalRequest);
    });
  };

  const handleExpiredRefreshToken = () => {
    clearSession();
    setCookie(REDIRECT_LOGOUT_KEY, true);
    window.location.assign(ROUTES.WELCOME.PATH);
  };

  return axios;
};
