FROM node:18 AS builder
WORKDIR /source
COPY . .
RUN npm install --pure-lockfile && npm run build