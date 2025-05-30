# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck ekle
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -q --spider http://localhost:3002/health || exit 1

EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]
