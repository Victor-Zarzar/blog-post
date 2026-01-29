import "dotenv/config";
import { z } from "zod";

export const prismaEnv = z.object({
  DATABASE_URL: z.url(),
}).parse(process.env);
