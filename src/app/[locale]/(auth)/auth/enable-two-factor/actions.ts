"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function enableTwoFactor(password: string) {
  const data = await auth.api.enableTwoFactor({
    body: {
      password,
      issuer: "Blog Post",
    },
    headers: await headers(),
  });

  return data;
}
