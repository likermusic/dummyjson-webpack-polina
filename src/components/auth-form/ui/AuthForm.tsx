import { useAuthForm } from "../model/useAuthForm";

export function AuthForm() {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useAuthForm();

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
        <header className="mb-6 space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Authorization
          </h1>
          <p className="text-sm text-white/70">
            Sign in to open protected pages.
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {errors.root ? (
            <div className="rounded-lg border border-rose-200/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-100">
              {errors.root.message}
            </div>
          ) : null}
          <label className="block text-sm text-white/80">
            Username
            <input
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              type="text"
              autoComplete="username"
              placeholder="kminchelle"
              {...register("username")}
            />
            {errors.username ? (
              <span className="mt-2 block text-xs text-rose-200">
                {errors.username.message}
              </span>
            ) : null}
          </label>

          <label className="block text-sm text-white/80">
            Password
            <input
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              type="password"
              autoComplete="current-password"
              placeholder="********"
              {...register("password")}
            />
            {errors.password ? (
              <span className="mt-2 block text-xs text-rose-200">
                {errors.password.message}
              </span>
            ) : null}
          </label>

          <button
            className="flex w-full items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}
