import { RedisClient } from "bun";
import env from "@/env.mjs";

export const redis = new RedisClient(env.REDIS_URL ?? "redis://localhost:6379");
