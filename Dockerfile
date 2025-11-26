# Dockerfile para Dokploy (React + Vite + pnpm)
FROM node:20-alpine AS builder

WORKDIR /app

# Instala pnpm globalmente
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# ---
# Etapa de producción
FROM node:20-alpine AS runner
WORKDIR /app

# Instala pnpm globalmente
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./

# Instala solo las dependencias de producción (si las hubiera)
RUN pnpm install --prod --frozen-lockfile

EXPOSE 4173
CMD ["pnpm", "run", "preview", "--", "--port", "4173", "--host"]
