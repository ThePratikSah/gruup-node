#Build stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the app
COPY . .

# Install Prisma CLI globally
RUN npm install -g prisma

# Build TypeScript
RUN npm run build

# Expose app port
EXPOSE 3000

# Default command
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npm run serve"]
