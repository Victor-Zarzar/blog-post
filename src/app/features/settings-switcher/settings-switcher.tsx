"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";
import { FaArrowRight, FaLaptopCode } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

import LangToggler from "@/app/features/lang-toggle/lang-toggle";

import { Button } from "@/app/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/ui/select";
import { Separator } from "@/app/shared/ui/separator";

export default function SettingsSwitcher() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const t = useTranslations("Navbar");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-1 rounded-xl hover:bg-accent transition"
          onClick={() => setOpen(true)}
          aria-label={t("settings")}
        >
          <IoMdSettings size={22} />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[340px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IoMdSettings size={18} />
            {t("settings")}
          </DialogTitle>
          <DialogDescription>{t("dialog-description")}</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="grid gap-4 py-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm">{t("toggle-theme")}</span>

            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder={t("system")} />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <MdOutlineLightMode />
                    <span>{t("light")}</span>
                  </div>
                </SelectItem>

                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <MdDarkMode />
                    <span>{t("dark")}</span>
                  </div>
                </SelectItem>

                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <FaLaptopCode />
                    <span>{t("system")}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm">{t("language")}</span>
            <LangToggler />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={() => setOpen(false)}>
            {t("close")}
            <FaArrowRight className="ml-2 animate-pulse" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
