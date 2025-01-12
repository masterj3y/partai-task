FROM node:22-alpine3.20 AS development

WORKDIR /usr/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm@9.15.3 && pnpm install -r

COPY . .

RUN pnpm install && pnpm run build

FROM node:22-alpine3.20 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm@9.15.3 && pnpm install --prod

COPY --from=development /usr/app/dist ./dist

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENTRYPOINT [ "node", "./dist/main.js" ]
