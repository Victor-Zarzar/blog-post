import { hash, verify } from "argon2";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  captcha,
  customSession,
  emailOTP,
  lastLoginMethod,
  oAuthProxy,
  twoFactor,
} from "better-auth/plugins";
import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";
import env from "@/env.mjs";
import { db } from "@/lib/db";
import * as authSchema from "./db/auth-schema";
import { redis } from "./redis/client";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true,
  auth: {
    user: env.SMTP_EMAIL,
    pass: env.SMTP_PASSWORD,
  },
});

export const auth = betterAuth({
  appName: "Blog Post",
  baseURL: env.NEXT_PUBLIC_WEBSITE_URL,
  telemetry: { enabled: false },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
    usePlural: false,
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => await hash(password),
      verify: async ({ hash, password }) => await verify(hash, password),
    },
  },
  secondaryStorage: {
    get: async (key) => {
      const value = await redis.get(key);
      return value ?? null;
    },
    set: async (key, value, ttl) => {
      await redis.set(key, value);

      if (ttl) {
        await redis.expire(key, ttl);
      }
    },
    delete: async (key) => {
      await redis.del(key);
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 5,
    storage: "secondary-storage",
  },
  session: {
    expiresIn: 60 * 60 * 24 * 1,
    updateAge: 60 * 60 * 6,
  },
  trustedOrigins: [env.BETTER_AUTH_URL],
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    oAuthProxy(),
    lastLoginMethod(),
    twoFactor({
      issuer: "Blog Post",
    }),
    captcha({
      provider: "google-recaptcha",
      secretKey: env.GOOGLE_RECAPTCHA_SECRET_KEY,
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const sanitizedEmail = sanitizeHtml(email);
        const sanitizedOtp = sanitizeHtml(otp);

        const subjects = {
          "sign-in": "Your login code",
          "email-verification": "Verify your email",
          "forget-password": "Password reset",
          "change-email": "Email change",
        };

        const messages = {
          "sign-in": `Use the code below to sign in to your account:`,
          "email-verification": `Use the code below to verify your email:`,
          "forget-password": `Use the code below to reset your password:`,
          "change-email": `Use the code below to confirm your email change:`,
        };

        await transporter.sendMail({
          from: `"Blog Post" <${env.SMTP_FROM}>`,
          to: sanitizedEmail,
          subject: subjects[type],
          html: `
                <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
                  <h2>${subjects[type]}</h2>
                  <p>${messages[type]}</p>
                  <div style="
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    background: #f4f4f4;
                    padding: 16px 24px;
                    border-radius: 8px;
                    display: inline-block;
                    margin: 16px 0;
                  ">
                  ${sanitizedOtp}
                  </div>
                  <p style="color: #888; font-size: 13px;">
                  This code expires in 10 minutes. Do not share it with anyone.
                  </p>
                </div>
              `,
        });
      },
    }),
    customSession(async ({ user, session }) => {
      return {
        user: {
          ...user,
          isAdmin: user.email === env.ADMIN_EMAIL,
        },
        session,
      };
    }),
  ],
});
