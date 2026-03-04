import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch } from "@/app/store";
import { routes } from "@/shared/routes";
import { signOut } from "./authSlice";

export function useSignOut() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSignOut = () => {
    dispatch(signOut());
    navigate(routes.auth, { replace: true });
  };

  return { onSignOut };
}
