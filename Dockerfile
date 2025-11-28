# Stage 1: Build the React Client
FROM node:18-alpine as client-build

WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install client dependencies
RUN npm install

# Copy client source code
COPY client/ ./

# Build the client application
RUN npm run build

# Stage 2: Setup the Node.js Server
FROM node:18-alpine

WORKDIR /app

# Copy server package files
COPY server/package*.json ./server/

# Install server dependencies (production only)
WORKDIR /app/server
RUN npm install --production

# Copy server source code
COPY server/ ./

# Copy built client assets from the previous stage
COPY --from=client-build /app/client/dist ../client/dist

# Expose the port the app runs on
EXPOSE 8080

# Environment variables (can be overridden at runtime)
ENV NODE_ENV=production
ENV PORT=8080

# Start the server
CMD ["npm", "start"]
