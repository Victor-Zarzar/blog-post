import { betterAuth } from "better-auth";
import {
  customSessionClient,
  lastLoginMethodClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import env from "@/env.mjs";
import type { auth } from "@/lib/auth";

export const authClient = betterAuth({
  baseURL: env.NEXT_PUBLIC_WEBSITE_URL,
  plugins: [
    lastLoginMethodClient(),
    customSessionClient<typeof auth>(),
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/auth/two-factor";
      },
    }),
  ],
});

const UserInfer = authClient.$Infer.Session.user;
export type User = typeof UserInfer;
