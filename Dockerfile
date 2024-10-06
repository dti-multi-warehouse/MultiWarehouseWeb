# Use Node.js as the base image
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies and build the application
FROM base AS builder
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Setup production image
FROM base AS release
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Run the app
EXPOSE 3000
CMD ["node", "server.js"]