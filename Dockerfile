# SoliVana Sleep — multi-stage build for Railway.
# Standalone Next.js output keeps the runner image lean and predictable.
# Matches the growth-engine pattern. Nixpacks auto-detection has been
# inconsistent with Next.js 16 + React 19, so we drive the build ourselves.

# ─── deps ────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ─── builder ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ─── runner ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root for the running container
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Public assets and the standalone runtime
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Railway injects PORT at runtime. HOSTNAME=0.0.0.0 is set at both the
# image ENV layer (covers the case where Railway runs `npm start` from
# the dashboard "Custom Start Command" override) and inline in CMD
# (covers the case where Railway honors the Dockerfile CMD). Whichever
# path the platform takes, the standalone server binds 0.0.0.0.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["sh", "-c", "echo \"[boot] starting solivana-sleep PORT=${PORT:-unset} HOSTNAME=${HOSTNAME:-unset}\"; HOSTNAME=0.0.0.0 exec node server.js"]
