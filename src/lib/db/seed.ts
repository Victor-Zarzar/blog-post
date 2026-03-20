import { eq } from "drizzle-orm";
import env from "@/env.mjs";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";

await auth.api.signUpEmail({
  body: {
    name: "Admin User",
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
  },
});

await db
  .update(user)
  .set({
    role: "admin",
    emailVerified: true,
  })
  .where(eq(user.email, env.ADMIN_EMAIL));

console.log("Admin User created successfully:", env.ADMIN_EMAIL);
process.exit(0);
