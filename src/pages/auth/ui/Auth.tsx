import { setAuthenticated } from "@/shared/lib/auth";
import { routes } from "@/shared/routes";
import { AuthForm, type AuthCredentials } from "@/components/auth-form";
import { useNavigate } from "react-router-dom";

export function Auth() {
  const navigate = useNavigate();

  const handleSignIn = (_credentials: AuthCredentials) => {
    setAuthenticated(true);
    navigate(routes.products, { replace: true });
  };

  return <AuthForm onSubmit={handleSignIn} />;
}
