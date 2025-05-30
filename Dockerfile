# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add bash for debugging
RUN apk add --no-cache bash

# Verify the built files exist
RUN ls -la /usr/share/nginx/html

EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]
