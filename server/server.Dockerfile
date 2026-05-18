# Backend Dockerfile — Node.js / Express

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files first (better caching)
COPY package.json package-lock.json* ./

# Install dependencies (stable install)
RUN npm ci

# Copy all source code
COPY . .

# Expose the same port your app uses (5000)
EXPOSE 5000

# Start server
CMD ["node", "index.js"]