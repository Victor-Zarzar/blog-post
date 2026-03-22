"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import type { CommandLink } from "@/app/shared/types/command/command";
import { Button } from "@/app/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/app/shared/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/app/shared/ui/dialog";
import { useRouter } from "@/i18n/navigation";

export default function CommandPalette() {
  const t = useTranslations("PagesLayout");
  const router = useRouter();

  const [isOpen, setIsOpen] = React.useState(false);

  const links: CommandLink[] = [
    { id: "home", labelKey: "nav.home", href: "/" },
    { id: "reading-list", labelKey: "nav.readingList", href: "/reading-list" },
    { id: "tags", labelKey: "nav.tags", href: "/tags" },
    { id: "about", labelKey: "nav.about", href: "/about" },
    { id: "contact", labelKey: "nav.contact", href: "/contact" },
  ];

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.code === "scape" && isOpen)
      ) {
        event.preventDefault();

        setIsOpen(!isOpen);
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const go = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="hidden h-9 w-[260px] justify-start gap-2 px-3 text-sm md:flex"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-muted-foreground">{t("searchPlaceholder")}</span>
        <span className="ml-auto text-xs text-muted-foreground">⌘K</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 overflow-hidden">
          <DialogTitle className="sr-only">{t("command.navigate")}</DialogTitle>

          <Command>
            <CommandInput placeholder={t("searchPlaceholder")} />
            <CommandList>
              <CommandEmpty>{t("command.empty")}</CommandEmpty>

              <CommandGroup heading={t("command.navigate")}>
                {links.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${t(item.labelKey)} ${item.keywords ?? ""}`}
                    onSelect={() => go(item.href)}
                  >
                    {t(item.labelKey)}
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading={t("command.account")}>
                <CommandItem onSelect={() => go("/signin")}>
                  {t("signIn")}
                </CommandItem>
                <CommandItem onSelect={() => go("/signup")}>
                  {t("createAccount")}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
