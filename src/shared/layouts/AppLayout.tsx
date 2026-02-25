import { Outlet, useNavigation } from "react-router-dom";

export function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
        </div>
      ) : null}
      <Outlet />
    </div>
  );
}
