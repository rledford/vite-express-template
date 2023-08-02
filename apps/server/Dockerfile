FROM node:16-alpine

RUN npm i -g pnpm@8

COPY ./package.json .
COPY ./src/* ./src/

RUN pnpm i
RUN pnpm build

CMD ["pnpm", "start"]
