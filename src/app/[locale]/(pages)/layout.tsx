import { NavItem } from "@/app/entities/nav/types";
import { Link } from "@/i18n/navigation"

const NAV_ITEMS: Array<NavItem> = [
  { label: "Home", link: "/" },
  { label: "Reading List", link: "/reading-list" },
  { label: "Tags", link: "/tags" },
  { label: "About", link: "/about" },
];

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Topbar */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-foreground text-background grid place-items-center text-xs font-bold">
              TEN
            </div>

            <div className="hidden md:flex items-center gap-2">
              <input
                placeholder="Type to search..."
                className="h-9 w-[260px] rounded-md border px-3 text-sm bg-background"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <a className="text-sm text-muted-foreground hover:text-foreground" href="/signin">
              Sign in
            </a>
            <a className="h-9 rounded-md border px-3 text-sm grid place-items-center" href="/signup">
              Create account
            </a>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-4 py-6">
        {/* Left nav */}
        <aside className="hidden lg:block lg:col-span-2">
          <nav className="sticky top-20 space-y-1 text-sm">
            {NAV_ITEMS.map((i) => (
              <Link
                key={i.link}
                href={i.link}
                className="block rounded-md px-2 py-2 hover:bg-accent"
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Center content */}
        <main className="col-span-12 lg:col-span-7">
          {children}
        </main>

        {/* Right aside */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold">TEN Community</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Um espaço pra devs compartilharem e evoluírem.
              </p>
              <div className="mt-3 grid gap-2">
                <a className="h-9 rounded-md border px-3 text-sm grid place-items-center" href="/signup">
                  Create account
                </a>
                <a className="h-9 rounded-md px-3 text-sm grid place-items-center hover:bg-accent" href="/signin">
                  Sign in
                </a>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="text-sm font-semibold">About</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Built with Next.js, TypeScript, Prisma, Docker.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
