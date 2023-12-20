import { ReactNode } from "react";

export interface ResponseErrorData {
  error: string;
  error_description: string;
}

export interface IAuthUser {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface IUser {
  email: string;
  firstName: string;
  id: string;
  jerseyNumber: number;
  lastName: string;
  phoneNumber: string;
  photoUrl: string;
  position: string;
}

export const initialUser = {
  email: "",
  firstName: "",
  id: "",
  jerseyNumber: 0,
  lastName: "",
  phoneNumber: "",
  photoUrl: "",
  position: "",
  lastLogin: undefined,
};

export interface IProps {
  children: ReactNode;
}

export type GlobalContextType = {
  updateUser: (state: IUser) => void;
  user: IUser;
};

export interface IDropdownItem {
  id: string;
  label1: string;
  label2: string;
  separator: string;
}

export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  type: string;
  width?: number;
};
