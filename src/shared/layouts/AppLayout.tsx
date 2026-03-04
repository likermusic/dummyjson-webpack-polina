import { Outlet, useNavigation } from "react-router-dom";
import { Spinner } from "@/shared/ui/Spinner";

export function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <Spinner size="lg" />
        </div>
      ) : null}
      <Outlet />
    </div>
  );
}
