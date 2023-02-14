# syntax=docker/dockerfile:1

FROM node:18.14.0-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18.14.0-alpine AS runner

# Improve alpine container
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN chown -R node:node /app
USER node

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .
