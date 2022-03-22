from node:17-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
ENV PORT 3000
CMD ["./docker-entrypoint.sh"]

