import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/app.header";
import { useEffect } from "react";
import { fetchAcountApi } from "./services/api";
import { useCurrentApp } from "./components/context/app.context";
import PacmanLoader from "react-spinners/PacmanLoader";

function Layout() {
  const { setIsAuthenticated, setUser, isAppLoading, setIsAppLoading } =
    useCurrentApp();
  useEffect(() => {
    const fetchAcoount = async () => {
      const res = await fetchAcountApi();
      if (res.data) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
      setIsAppLoading(false);
    };
    fetchAcoount();
  }, []);
  return (
    <>
      {isAppLoading === false ? (
        <div>
          <AppHeader />
          <Outlet />
        </div>
      ) : (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <PacmanLoader size={25} color="#31874f" />
        </div>
      )}
    </>
  );
}

export default Layout;
