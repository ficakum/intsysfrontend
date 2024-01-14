import { ReactNode } from "react";

export interface ResponseErrorData {
  status: number;
  message: string;
}

export interface IAuthUser {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface IUser {
  email: string;
  username: string;
  id: string;
  group: string;
}

export const initialUser = {
  email: "",
  username: "",
  group: "",
  id: "",
};

export interface Song {
  name: string;
}

export interface IRecommendedSong extends Song {
  _id: string;
  name: string;
  author: string;
  genre: string;
}

export interface ITrack {
  group: string;
  trackInformation: string;
}

export interface IGroup {
  _id: string;
  groupName: string;
  currentTrack: string;
  maxMembers: number;
  membersNum: number;
}

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
