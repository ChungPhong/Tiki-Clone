import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/app.header";

function Layout() {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default Layout;
