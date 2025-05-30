# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN apk add --no-cache curl

HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:3002/ || exit 1

EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]
