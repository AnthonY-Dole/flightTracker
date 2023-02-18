import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

const Loadable = (Component: any) => (props: any) => {
  return (
    <>
      <Suspense fallback={<>Loading</>}>
        <Component {...props} />
      </Suspense>
    </>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);
}

const Home = Loadable(lazy(() => import("../pages/Home")));
