# Use Node.js as the base image
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies and build the application
FROM base AS builder
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Build the Next.js application
RUN npm run build

# Setup production image
FROM base AS release
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/rename-env-vars.ts ./rename-env-vars.ts

# Install ts-node for running TypeScript files
RUN npm install -g ts-node

# Run the app
EXPOSE 3000
CMD ["sh", "-c", "ts-node --transpile-only rename-env-vars.ts && node server.js"]