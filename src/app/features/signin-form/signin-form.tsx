"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Sentry from "@sentry/nextjs";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { cn } from "@/app/shared/lib/utils";
import { Button } from "@/app/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/app/shared/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/shared/ui/form";
import { Input } from "@/app/shared/ui/input";
import { Link, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("Login");
  const router = useRouter();

  const formSchema = z.object({
    email: z.email(t("invalidemail")),
    password: z
      .string()
      .min(1, t("passwordrequired"))
      .min(6, t("passwordmin"))
      .max(100, t("passwordmax")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        async onSuccess(context) {
          if (context.data.twoFactorRedirect) {
            router.push("/auth/two-factor");
            return;
          }
          router.push("/dashboard");
        },
      },
    );

    if (error) {
      form.setError("root", { message: error.message });
      toast.error(error.message);
      Sentry.captureException(error.message);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("subtitle")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Field>
                        <FormLabel asChild>
                          <FieldLabel htmlFor="email">
                            {t("emailLabel")}
                          </FieldLabel>
                        </FormLabel>

                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                      </Field>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Field>
                        <div className="flex items-center">
                          <FormLabel asChild>
                            <FieldLabel htmlFor="password">
                              {t("passwordLabel")}
                            </FieldLabel>
                          </FormLabel>

                          <Link
                            href="/auth/reset-password"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            {t("forgotPassword")}
                          </Link>
                        </div>

                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                      </Field>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Field className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    {t("submit")}
                  </Button>

                  <Button variant="outline" type="button" className="w-full">
                    {t("github")}
                  </Button>

                  <FieldDescription className="text-center">
                    {t("noAccount")}{" "}
                    <Link
                      href="/auth/signup"
                      className="underline underline-offset-4"
                    >
                      {t("signup")}
                    </Link>
                  </FieldDescription>

                  <FieldDescription className="text-center">
                    <Link
                      href="/"
                      className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                    >
                      {t("backToHome")}
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
