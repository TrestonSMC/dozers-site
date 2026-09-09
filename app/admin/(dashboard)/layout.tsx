import Link from "next/link";
import {
  BarChart3,
  ExternalLink,
  Images,
  LogOut,
  Menu,
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
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: Images,
  },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-[#080b0f] text-white">
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

      <div className="min-w-0 max-w-full lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#080b0f]/95 px-3 backdrop-blur-xl sm:h-20 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            {/* Mobile dropdown */}
            <details className="group relative lg:hidden">
              <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 transition hover:border-[#29C3FF]/40 hover:text-[#29C3FF] [&::-webkit-details-marker]:hidden">
                <Menu className="h-5 w-5" />
              </summary>

              <div className="absolute left-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1117] p-2 shadow-2xl">
                <div className="border-b border-white/10 px-3 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#29C3FF]">
                    Dozers Grill
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    Admin Menu
                  </p>
                </div>

                <nav className="space-y-1 py-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-300 transition hover:bg-[#29C3FF]/10 hover:text-[#29C3FF]"
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>

                <form
                  action={logout}
                  className="border-t border-white/10 pt-2"
                >
                  <button
                    type="submit"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </form>
              </div>
            </details>

            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold uppercase tracking-[0.2em] text-[#29C3FF] sm:text-xs">
                Dozers Grill
              </p>

              <p className="truncate text-sm font-semibold text-white sm:mt-1 sm:text-base">
                Admin Panel
              </p>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-[#29C3FF]/40 hover:text-[#29C3FF] sm:px-4 sm:text-sm"
          >
            <ExternalLink className="h-4 w-4" />

            <span className="hidden sm:inline">
              View Website
            </span>

            <span className="sm:hidden">
              Website
            </span>
          </Link>
        </header>

        <main className="min-w-0 max-w-full overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}