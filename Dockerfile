FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Install serve
RUN npm install -g serve

EXPOSE 3002

# Start the app
CMD ["serve", "-s", "build", "-l", "3002"]
