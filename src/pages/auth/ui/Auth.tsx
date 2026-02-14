import { Link } from "react-router-dom";
import { routes } from "@/shared/routes";

type AuthPageProps = {
  onLogin: () => void;
};

// export function AuthPage({ onLogin }: AuthPageProps) {
//   return (
//     <main>
//       <h1>Authorization</h1>
//       <p>Sign in to open protected pages.</p>
//       <button type="button" onClick={onLogin}>
//         Sign in
//       </button>
//     </main>
//   );
// }

export function Auth() {
  return (
    <main>
      <h1>Authorization</h1>
      <p>Sign in to open protected pages.</p>
      <button type="button">
        <Link to={routes.products}>Sign in</Link>
      </button>
    </main>
  );
}
