import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { routes } from "@/shared/routes";
import type { AppDispatch } from "@/app/store";
import { signInByCredentials } from "./authSlice";
import type { AuthCredentials } from "../types";
import { authSchema } from "../types";

export function useAuthForm() {
  const dispatch = useDispatch<AppDispatch>();
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

  /*
  Что делает .unwrap()? Он возвращает новый Promise. Если при выполнении thunk пришло успешное действие (fulfilled), то в этом новом Promise будет передан payload из этого действия — то есть данные, которые вы ждали. А если пришло действие с ошибкой (rejected), то метод .unwrap() бросает ошибку. Вы можете поймать эту ошибку обычным try/catch в компоненте.
  */
  const onSubmit = async (credentials: AuthCredentials) => {
    clearErrors("root");
    try {
      await dispatch(signInByCredentials(credentials)).unwrap();
      navigate(routes.products, { replace: true });
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          typeof error === "string" ? error : "Invalid username or password",
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
