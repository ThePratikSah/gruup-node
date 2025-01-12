# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Install Prisma CLI globally
RUN npm install -g prisma

# Build TypeScript
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "serve"]
