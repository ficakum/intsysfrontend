import { APP_PREFIX } from "./general";

export const ACCESS_CLIENT_TOKEN_KEY = `${APP_PREFIX}accessClientToken`;
export const ACCESS_USER_TOKEN_KEY = `${APP_PREFIX}accessUserToken`;
export const REFRESH_TOKEN_KEY = `${APP_PREFIX}refreshToken`;

export const INVALID_TOKEN = "invalid_token";
export const INVALID_ACCESS_TOKEN_DESCRIPTION = "Access token expired";
export const INVALID_REFRESH_TOKEN_DESCRIPTION = "Invalid refresh token";

export const HEADERS_CONTENT_TYPE_FORM_URLENCODED = "application/json";

export const REDIRECT_LOGOUT_KEY = `${APP_PREFIX}redirectLogout`;

export const GET_USERS_API_URL = "v1/users";

export const LOGIN_MESSAGE = "You are now logged in!";
export const REDIRECT_LOGOUT_MESSAGE =
  "Your session expired. Please log in again.";
