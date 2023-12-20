import { AxiosRequestConfig } from "axios";

import { DEFAULT_HEADERS } from "./headers";

export const Config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: DEFAULT_HEADERS,
};
