import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { routes } from "@/shared/routes";
import type { AppThunk } from "@/app/store";
import { signIn } from "./authSlice";
import type { AuthCredentials } from "../types";
import { login } from "../api/authApi";
import { authSchema } from "../types";

export function useAuthForm() {
  const navigate = useNavigate();
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

  const onSubmit =
    (credentials: AuthCredentials): AppThunk<Promise<void>> =>
    async (dispatch) => {
      clearErrors("root");
      try {
        const data = await login(credentials);
        dispatch(
          signIn({
            accessToken: data.accessToken ?? null,
            refreshToken: data.refreshToken ?? null,
          }),
        );
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
