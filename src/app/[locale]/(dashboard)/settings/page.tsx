"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/shared/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/shared/ui/card";
import { Separator } from "@/app/shared/ui/separator";
import { Button } from "@/app/shared/ui/button";

import LangToggler from "@/app/features/lang-toggle/lang-toggle";
import { cn } from "@/app/shared/lib/utils"

export default function SettingsPage() {
  const t = useTranslations("Navbar");
  const { theme, setTheme } = useTheme();

  return (
    <section className="min-h-[calc(100vh-56px)] flex items-start justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Theme e idioma do app.
          </p>
        </div>

        <Tabs defaultValue="appearance" className="w-full">
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            {/* Left nav */}
            <Card className="h-fit">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Settings</CardTitle>
                <CardDescription className="text-xs">
                  Preferências do usuário
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <TabsList className="grid h-auto w-full grid-cols-1 bg-transparent p-0">
                  <TabsTrigger
                    value="profile"
                    className="justify-start data-[state=active]:bg-accent"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="justify-start data-[state=active]:bg-accent"
                  >
                    Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="appearance"
                    className="justify-start data-[state=active]:bg-accent"
                  >
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start data-[state=active]:bg-accent"
                  >
                    Notifications
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>

            {/* Right content */}
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Ajuste aparência e idioma.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <TabsContent value="profile" className="m-0 space-y-4">
                  <div>
                    <h3 className="font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      Placeholder pro teu “User settings”.
                    </p>
                  </div>
                  <Separator />
                  <Button variant="secondary" disabled>
                    Save profile
                  </Button>
                </TabsContent>

                <TabsContent value="account" className="m-0 space-y-4">
                  <div>
                    <h3 className="font-medium">Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Placeholder pra futuras configs (email, senha, etc).
                    </p>
                  </div>
                  <Separator />
                  <Button variant="secondary" disabled>
                    Save account
                  </Button>
                </TabsContent>

                <TabsContent value="appearance" className="m-0 space-y-4">
                  <div>
                    <h3 className="font-medium">Theme</h3>
                    <p className="text-sm text-muted-foreground">
                      Selecione o tema do dashboard.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <ThemeCard
                      title={t("light")}
                      active={theme === "light"}
                      onClick={() => setTheme("light")}
                    />
                    <ThemeCard
                      title={t("dark")}
                      active={theme === "dark"}
                      onClick={() => setTheme("dark")}
                    />
                    <ThemeCard
                      title={t("system")}
                      active={theme === "system"}
                      onClick={() => setTheme("system")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{t("language")}</h3>
                      <p className="text-sm text-muted-foreground">
                        Troque o idioma sem recarregar.
                      </p>
                    </div>
                    <LangToggler />
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button>Update preferences</Button>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="m-0 space-y-4">
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Placeholder (depois tu pluga email/push).
                    </p>
                  </div>
                  <Separator />
                  <Button variant="secondary" disabled>
                    Save notifications
                  </Button>
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

function ThemeCard({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group rounded-xl border p-3 text-left transition hover:bg-accent/40",
        active && "ring-2 ring-ring"
      )}
      aria-pressed={active}
    >
      <div className="mb-3 aspect-[16/10] rounded-lg border bg-muted/40 p-2">
        {/* mini “preview” fake */}
        <div className="space-y-2">
          <div className="h-2 w-2/3 rounded bg-muted" />
          <div className="h-2 w-1/2 rounded bg-muted" />
          <div className="h-2 w-3/4 rounded bg-muted" />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="h-6 rounded bg-muted" />
            <div className="h-6 rounded bg-muted" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        {active ? (
          <span className="text-xs text-muted-foreground">Selected</span>
        ) : (
          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition">
            Select
          </span>
        )}
      </div>
    </button>
  );
}
