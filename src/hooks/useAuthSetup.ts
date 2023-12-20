import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosError } from "axios";

import { GlobalContext } from "../context/global-context";
import { GlobalContextType, IUser } from "../models";
import { getLoggedInUser } from "../services/Auth";
import { ROUTES } from "../constants/routes";

export const useAuthSetup = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(GlobalContext) as GlobalContextType;

  const setup = () => {
    getLoggedInUser()
      .then((userResponse: IUser) => {
        updateUser(userResponse);
        redirectUser();
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const redirectUser = () => {
    navigate(ROUTES.WELCOME.PATH);
  };

  return [setup];
};
