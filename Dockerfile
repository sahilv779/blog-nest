# Use the official Node.js image as a base
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the NestJS app source
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the backend API port
EXPOSE 3000

# Run the NestJS app
CMD ["npm", "run", "start:prod"]
