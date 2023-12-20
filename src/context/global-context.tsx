import { GlobalContextType, initialUser, IProps, IUser } from "../models";
import { createContext, FC } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalProvider: FC<IProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<IUser>("user", initialUser);

  const updateUser = (state: IUser) => {
    setUser(state);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        updateUser,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
