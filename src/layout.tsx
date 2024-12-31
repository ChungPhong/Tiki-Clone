import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/app.header";
import { useEffect } from "react";
import { fetchAcountApi } from "./services/api";
import { useCurrentApp } from "./components/context/app.context";

function Layout() {
  const { setIsAuthenticated, setUser, isAppLoading, setIsAppLoading } =
    useCurrentApp();
  useEffect(() => {
    const fetchAcoount = async () => {
      const res = await fetchAcountApi();
      if (res.data) {
        setUser(res.data.user);
      }
      setIsAppLoading(false);
    };
    fetchAcoount();
  }, []);
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default Layout;
