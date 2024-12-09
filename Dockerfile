FROM node:22-alpine AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN --mount=type=cache,target=/root/.npm npm install

# Build
COPY . .
RUN pnpm run build


# Prod server
FROM node:22-alpine AS prod
WORKDIR /app
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
COPY package.json .
EXPOSE ${PORT}
CMD [ "node", "build" ]
