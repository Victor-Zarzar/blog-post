import { eq } from "drizzle-orm";
import env from "@/env.mjs";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";

const adminEmail = env.ADMIN_EMAIL;
const adminPassword = env.ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be defined");
}

await auth.api.signUpEmail({
  body: {
    name: "Admin User",
    email: adminEmail,
    password: adminPassword,
  },
});

await db
  .update(user)
  .set({
    role: "admin",
    emailVerified: true,
  })
  .where(eq(user.email, adminEmail));

process.exit(0);
