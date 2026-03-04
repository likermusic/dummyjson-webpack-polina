import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { routes } from "@/shared/routes";
import type { RootState } from "@/app/store";

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  return function ProtectedComponent(props: P) {
    const isAuth = useSelector(
      (state: RootState) => state.auth.accessToken !== null,
    );
    if (!isAuth) {
      return <Navigate to={routes.auth} replace />;
    }

    return <Component {...props} />;
  };
};
