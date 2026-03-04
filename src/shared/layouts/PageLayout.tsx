import { Outlet } from "react-router-dom";
import { SignOutButton } from "@/components/auth-form";

export function PageLayout() {
  return (
    <section className="px-4 py-4">
      <div className="mb-4 flex justify-end">
        <SignOutButton />
      </div>
      <Outlet />
    </section>
  );
}
