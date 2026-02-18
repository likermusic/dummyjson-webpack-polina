import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { routes } from "@/shared/routes";
import { setAuthenticated } from "@/shared/lib/auth";
import { signIn } from "./authSlice";
import type { AuthCredentials } from "../types/types";

export function useAuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = (_credentials: AuthCredentials) => {
    setAuthenticated(true);
    dispatch(signIn());
    navigate(routes.products, { replace: true });
  };

  return { handleAuth };
}
