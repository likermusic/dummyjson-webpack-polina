import { useSignOut } from "../model/useSignOut";

export function SignOutButton() {
  const { onSignOut } = useSignOut();

  return (
    <button
      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400/60"
      type="button"
      onClick={onSignOut}
    >
      Sign out
    </button>
  );
}
