# Build the static site, then serve dist/ with Caddy. Used when Railway's root directory is web/.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY astro.config.mjs ./
COPY src ./src
ENV PUBLIC_INDEXABLE=1
RUN npm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
