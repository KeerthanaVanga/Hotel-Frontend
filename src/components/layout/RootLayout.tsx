import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import GlobalLoader from "./GlobalLoader";

const RootLayout = () => {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <Outlet />
    </Suspense>
  );
};

export default RootLayout;
