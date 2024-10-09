# Use Node.js as the base image
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies and build the application
FROM base AS builder
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Build the Next.js application
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_FRONTEND_API
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL
ARG NEXT_PUBLIC_OPENCAGE_API_KEY
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