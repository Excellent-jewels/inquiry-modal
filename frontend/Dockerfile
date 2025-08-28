# Step 1: build the app
FROM node:18 AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code and build
COPY . .
RUN npm run build

# Step 2: run the app
FROM node:18
WORKDIR /app

# Copy built files and node_modules
COPY --from=builder /app ./

# Expose port 3000
EXPOSE 3000

# Start Next.js production server
CMD ["npm", "run", "start"]
