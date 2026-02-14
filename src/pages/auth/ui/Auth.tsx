import { setAuthenticated } from "@/shared/lib/auth";
import { routes } from "@/shared/routes";
import { useNavigate } from "react-router-dom";

export function Auth() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    setAuthenticated(true);
    navigate(routes.products, { replace: true });
  };

  return (
    <main>
      <h1>Authorization</h1>
      <p>Sign in to open protected pages.</p>
      <button type="button" onClick={handleSignIn}>
        Sign in
      </button>
    </main>
  );
}
