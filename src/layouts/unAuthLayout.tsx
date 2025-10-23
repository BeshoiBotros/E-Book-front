import { Outlet } from "react-router";
// import HeaderBootstrap from "../components/HeaderBootstrap";

const UnAuthLayout = () => {
  return (
    <>
      {/* <HeaderBootstrap /> */}
      <Outlet />
    </>
  );
};

export default UnAuthLayout;
