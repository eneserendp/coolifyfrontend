# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy env files
COPY .env* ./

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build with env variables
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3002

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3002/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
