FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies and build the application
FROM base AS builder
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Setup production image
FROM base AS release
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/bun.lockb ./bun.lockb
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/public ./public

# Run the app
USER bun
EXPOSE 3000
ENV NODE_ENV=developme
CMD ["bun", "run", "server.js"]