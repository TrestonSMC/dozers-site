import Link from "next/link";
import {
  BarChart3,
  ExternalLink,
  LogOut,
  Music2,
} from "lucide-react";
import { logout } from "../actions";

const navigation = [
  {
    name: "Analytics",
    href: "/admin",
    icon: BarChart3,
  },
  {
    name: "Live Music",
    href: "/admin/live-music",
    icon: Music2,
  },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080b0f] text-white">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#0c1117] lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#29C3FF]">
            Dozers Grill
          </p>

          <h2 className="mt-2 text-xl font-bold">
            Admin Panel
          </h2>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main admin area */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#080b0f]/95 px-4 backdrop-blur-xl sm:h-20 sm:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#29C3FF] sm:text-xs">
              Dozers Grill
            </p>

            <p className="mt-1 text-sm font-semibold text-white sm:text-base">
              Admin Panel
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-[#29C3FF]/40 hover:text-[#29C3FF] sm:px-4 sm:text-sm"
            >
              <ExternalLink className="h-4 w-4" />

              <span className="hidden sm:inline">
                View Website
              </span>

              <span className="sm:hidden">
                Website
              </span>
            </Link>

            <form action={logout} className="lg:hidden">
              <button
                type="submit"
                aria-label="Sign out"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </header>

        <main className="p-4 pb-28 sm:p-6 sm:pb-28 lg:p-8 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0c1117]/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-400 transition hover:bg-[#29C3FF]/10 hover:text-[#29C3FF] active:scale-95"
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}