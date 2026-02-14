import { isAuthenticated } from "@/shared/lib/auth";
import { routes } from "@/shared/routes";
import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  return function ProtectedComponent(props: P) {
    if (!isAuthenticated()) {
      return <Navigate to={routes.auth} replace />;
    }

    return <Component {...props} />;
  };
};
