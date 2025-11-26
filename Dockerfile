# Dockerfile para Dokploy (React + Vite + pnpm)

# Dockerfile para Dokploy (React + Vite + pnpm + serve)
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

# Instala serve globalmente para servir archivos estáticos
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
