# ./Dockerfile
# # ---- Build Stage ----  # #
FROM node:22-alpine AS builder
WORKDIR /app

# Define build arguments for environment variables
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_SERVER_API_BASE_URL

# Build time environment variables
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_SERVER_API_BASE_URL=$NEXT_SERVER_API_BASE_URL

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all application sources (including next.config.js)
COPY . .

# Build the Next.js standalone output
RUN npm run build

# Copy public assets and static assets into the standalone output for production serving
RUN cp -r public .next/standalone/ && \
    cp -r .next/static .next/standalone/.next/

# # ---- Production Server ---- # #
FROM node:22-alpine AS runner
WORKDIR /app

# Copy the standalone output (including all necessary dependencies and server code)
COPY --from=builder /app/.next/standalone ./

# Expose the port the run server
EXPOSE 8080
ENV PORT=8080
ENV HOST=0.0.0.0

CMD ["node", "server.js"]
