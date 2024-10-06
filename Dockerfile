# Use Node.js as the base image
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# Install dependencies and build the application
FROM base AS builder
COPY package.json package-lock.json ./
RUN npm install --development
COPY . .
RUN npm run build

# Setup production image
FROM base AS release
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/package-lock.json ./package-lock.json
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/public ./public

# Run the app
EXPOSE 3000
ENV NODE_ENV=development
CMD ["npm", "run", "start"]