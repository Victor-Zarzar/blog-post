FROM oven/bun:1-alpine AS base

WORKDIR /app

COPY package.json bun.lock* ./

RUN apk add --no-cache python3 make g++

RUN bun install --frozen-lockfile

EXPOSE 3000

CMD ["bun", "run", "dev"]
