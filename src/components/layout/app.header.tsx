import { useCurrentApp } from "components/context/app.context";

const AppHeader = () => {
  const { user } = useCurrentApp();
  return (
    <div>
      AppHeader
      <div>{JSON.stringify(user)}</div>
    </div>
  );
};
export default AppHeader;
