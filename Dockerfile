# Production image of utxo.ag: build the Astro site in web/, then serve web/dist with Caddy (web/Caddyfile).
# Railway builds this file (railway.json); the static files in the repository root are the old site and are not served.
FROM node:22-alpine AS build
WORKDIR /app
COPY web/package.json web/package-lock.json ./
RUN npm ci
COPY web/astro.config.mjs ./
COPY web/public ./public
COPY web/src ./src
ENV PUBLIC_INDEXABLE=1
RUN npm run build

FROM caddy:2-alpine
COPY web/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
