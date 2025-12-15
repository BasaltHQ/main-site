# --- Builder stage ---
FROM node:20-alpine AS builder

ENV NODE_ENV=production
WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci --omit=dev=false

# Copy source
COPY . .

# Build with type and lint errors ignored via next.config.js settings
RUN npm run build

# --- Runtime stage (standalone) ---
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Set necessary env for Next runtime
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

USER nextjs

CMD ["node", "server.js"]


