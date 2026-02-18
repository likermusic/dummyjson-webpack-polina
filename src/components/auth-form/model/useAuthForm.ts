import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { routes } from "@/shared/routes";
import { setAuthenticated } from "@/shared/lib/auth";
import { signIn } from "./authSlice";
import type { AuthCredentials } from "../types/types";
import { login } from "../api/authApi";
import { authSchema } from "../types/types";

export function useAuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (credentials: AuthCredentials) => {
    clearErrors("root");
    try {
      await login(credentials);
      setAuthenticated(true);
      dispatch(signIn());
      navigate(routes.products, { replace: true });
    } catch {
      setError("root", {
        type: "server",
        message: "Invalid username or password",
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
