"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
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

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters"),
    email: z.email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be at most 100 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormSchema = z.infer<typeof formSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const t = useTranslations("Signup");
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(values: FormSchema) {
    const { error } = await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        async onSuccess(context) {
          if (context.data) {
            router.push("/auth/signin");
          }
        },
      },
    );
    if (error) {
      form.setError("root", { message: error.message });
    }
  }

  return (
    <Form {...form}>
      <Card className={cn(className)} {...props}>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("subtitle")}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FormLabel asChild>
                        <FieldLabel htmlFor="name">{t("nameLabel")}</FieldLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder={t("namePlaceholder")}
                          autoComplete="name"
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
                      <FieldDescription>{t("emailHelp")}</FieldDescription>
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
                          {...field}
                        />
                      </FormControl>
                      <FieldDescription>{t("passwordHelp")}</FieldDescription>
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
                        <FieldLabel htmlFor="confirm-password">
                          {t("confirmPasswordLabel")}
                        </FieldLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="confirm-password"
                          type="password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FieldDescription>
                        {t("confirmPasswordHelp")}
                      </FieldDescription>
                    </Field>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.formState.errors.root?.message ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.root.message}
                </p>
              ) : null}

              <Field>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    {t("submit")}
                  </Button>
                </div>

                <FieldDescription className="px-6 text-center">
                  {t("alreadyHaveAccount")}{" "}
                  <Link href="/auth/signin">{t("signin")}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
