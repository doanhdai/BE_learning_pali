# ── Stage 1: Build / Install Dependencies ───────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev

# Generate Prisma client
RUN npx prisma generate

# ── Stage 2: Production Image ────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Copy application source
COPY . .

# Ensure uploads directory exists and is writable
RUN mkdir -p uploads && chown -R appuser:appgroup /app

USER appuser

EXPOSE 8081

CMD ["node", "server.js"]
