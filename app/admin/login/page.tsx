import { LockKeyhole } from "lucide-react";
import { login } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07090c] px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#12394a_0%,#07090c_48%)]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#29C3FF]/30 bg-[#29C3FF]/10">
            <LockKeyhole className="h-7 w-7 text-[#29C3FF]" />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#29C3FF]">
            Dozers Grill
          </p>

          <h1 className="text-3xl font-bold text-white">
            Owner Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Sign in to manage the Dozers website.
          </p>
        </div>

        <form
          action={login}
          className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="owner@dozersgrill.com"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#29C3FF]/70 focus:ring-2 focus:ring-[#29C3FF]/15"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#29C3FF]/70 focus:ring-2 focus:ring-[#29C3FF]/15"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-xl bg-[#29C3FF] px-4 py-3 font-bold text-[#071016] transition hover:bg-[#62d3ff] active:scale-[0.99]"
          >
            Sign In
          </button>

          <p className="mt-5 text-center text-xs text-gray-500">
            Authorized Dozers personnel only
          </p>
        </form>
      </div>
    </main>
  );
}