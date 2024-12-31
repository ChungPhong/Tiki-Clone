import { createContext, useContext, useState } from "react";
interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  setUser: (v: IUser) => void;
  user: IUser | null;
  setIsAppLoading: (v: boolean) => void;
  isAppLoading: boolean;
}
const CurrentAppContext = createContext<IAppContext | null>(null);
type TProps = {
  children: React.ReactNode;
};
export const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);
  return (
    <CurrentAppContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
        isAppLoading,
        setIsAppLoading,
      }}
    >
      {props.children}
    </CurrentAppContext.Provider>
  );
};
export const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);
  if (!currentAppContext) {
    throw new Error(
      "useCurrentApp has to be used within <CurrentAppContext.Provider>"
    );
  }
  return currentAppContext;
};
