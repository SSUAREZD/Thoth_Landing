FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist/Toth_landing_page ./dist/Toth_landing_page
EXPOSE 4000
ENV PORT=4000
CMD ["node", "dist/Toth_landing_page/server/server.mjs"]
