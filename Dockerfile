FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Install serve globally
RUN npm install -g serve

EXPOSE 3002

CMD ["serve", "-s", "build", "-l", "3002"]
