"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
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

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("ResetPassword");
  const router = useRouter();

  const [token] = useQueryState("token", parseAsString);
  const [error] = useQueryState("error", parseAsString);

  const formSchema = z
    .object({
      password: z
        .string()
        .min(1, t("passwordRequired"))
        .min(6, t("passwordMin"))
        .max(100, t("passwordMax")),
      confirmPassword: z
        .string()
        .min(1, t("confirmPasswordRequired"))
        .min(6, t("passwordMin"))
        .max(100, t("passwordMax")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await authClient.resetPassword({
      newPassword: values.password,
    });

    if (error) {
      form.setError("root", { message: error.message });
      return;
    }

    router.push("/auth/signin");
  }

  if (error || !token) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("subtitle")}</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-red-500">{error ?? t("missingToken")}</p>

            <FieldDescription className="mt-4 text-center">
              <Link
                href="/auth/signin"
                className="underline underline-offset-4"
              >
                {t("backToSignin")}
              </Link>
            </FieldDescription>
          </CardContent>
        </Card>
      </div>
    );
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Field>
                        <FormLabel asChild>
                          <FieldLabel htmlFor="password">
                            {t("passwordLabel")}
                          </FieldLabel>
                        </FormLabel>

                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder={t("passwordPlaceholder")}
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Field>
                        <FormLabel asChild>
                          <FieldLabel htmlFor="confirmPassword">
                            {t("confirmPasswordLabel")}
                          </FieldLabel>
                        </FormLabel>

                        <FormControl>
                          <Input
                            id="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder={t("confirmPasswordPlaceholder")}
                            {...field}
                          />
                        </FormControl>
                      </Field>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root?.message ? (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.root.message}
                  </p>
                ) : null}

                <Field className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    {t("submit")}
                  </Button>

                  <FieldDescription className="text-center">
                    {t("rememberedPassword")}{" "}
                    <Link
                      href="/auth/signin"
                      className="underline underline-offset-4"
                    >
                      {t("signin")}
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
