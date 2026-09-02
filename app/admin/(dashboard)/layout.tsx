import Link from "next/link";
import { BarChart3, LogOut, Music2 } from "lucide-react";
import { logout } from "../actions";

const navigation = [
  {
    name: "Analytics",
    href: "/admin",
    icon: BarChart3,
  },
  {
    name: "Live Music",
    href: "/admin/live-music/new",
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
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-white/10 bg-[#0c1117] lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#29C3FF]">
            Dozers Grill
          </p>

          <h2 className="mt-2 text-xl font-bold">Admin Panel</h2>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
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

      <div className="lg:pl-64">
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#080b0f]/90 px-5 backdrop-blur-xl sm:px-8">
          <div>
            <p className="text-sm text-gray-500">Website management</p>
            <p className="font-semibold text-white">Dozers Grill</p>
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-[#29C3FF]/40 hover:text-[#29C3FF]"
          >
            View Website
          </Link>
        </header>

        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}