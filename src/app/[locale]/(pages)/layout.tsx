import { useTranslations } from "next-intl";
import type { NavItem } from "@/app/entities/nav/types";
import CommandPalette from "@/app/features/command-palette/command-palette";
import { Button } from "@/app/shared/ui/button";
import { Link } from "@/i18n/navigation";

const NAV_ITEMS: Array<NavItem> = [
  { label: "nav.home", link: "/" },
  { label: "nav.readingList", link: "/reading-list" },
  { label: "nav.tags", link: "/tags" },
  { label: "nav.about", link: "/about" },
  { label: "nav.contact", link: "/contact" },
];

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("PagesLayout");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-xs font-bold text-background">
              {t("brand")}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <CommandPalette />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/signin">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 px-3"
              >
                {t("signIn")}
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                type="button"
                variant="default"
                size="sm"
                className="h-9 px-4 font-medium"
              >
                {t("createAccount")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-4 py-6">
        <aside className="hidden lg:block lg:col-span-2">
          <nav className="sticky top-20 space-y-1 text-sm">
            {NAV_ITEMS.map((i) => (
              <Link
                key={i.link}
                href={i.link}
                className="block rounded-md px-2 py-2 hover:bg-accent"
              >
                {t(i.label)}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="col-span-12 lg:col-span-7">{children}</main>

        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-base font-semibold">
                {t("communityCard.title")}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {t("communityCard.subtitle")}
              </p>

              <div className="mt-3 grid gap-2">
                <Link href="/signup">
                  <Button
                    type="button"
                    className="w-full font-medium"
                    variant="outline"
                  >
                    {t("communityCard.ctaPrimary")}
                  </Button>
                </Link>

                <Link href="/signin">
                  <Button
                    type="button"
                    className="w-full font-medium"
                    variant="outline"
                  >
                    {t("communityCard.ctaSecondary")}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="text-sm font-semibold">{t("aboutCard.title")}</h4>

              <p className="mt-2 text-sm text-muted-foreground">
                {t("aboutCard.text")}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
