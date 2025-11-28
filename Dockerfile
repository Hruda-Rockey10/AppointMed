# Backend-only Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy server package files
COPY server/package*.json ./server/

# Install server dependencies
WORKDIR /app/server
RUN npm install --production

# Copy server source code
COPY server/ ./

# Expose the port the app runs on
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Start the server
CMD ["npm", "start"]
