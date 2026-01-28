"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/ui/select";

import { usePathname, useRouter } from "@/i18n/navigation";

export default function LangToggler() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(newLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <Select
      disabled={isPending}
      onValueChange={onSelectChange}
      defaultValue={locale}
    >
      <SelectTrigger className="w-auto">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <Image src="/en.svg" alt="English" width={18} height={18} />
            {t("english")}
          </div>
        </SelectItem>

        <SelectItem value="es">
          <div className="flex items-center gap-2">
            <Image src="/es.svg" alt="Español" width={18} height={18} />
            {t("spanish")}
          </div>
        </SelectItem>

        <SelectItem value="pt">
          <div className="flex items-center gap-2">
            <Image src="/pt.svg" alt="Português" width={18} height={18} />
            {t("portuguese")}
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
