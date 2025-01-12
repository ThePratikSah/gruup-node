#Build stage
FROM node:20-alpine as base

# Set working directory
WORKDIR /home/node/app

# Install dependencies
COPY package*.json ./

RUN npm i

# Copy the rest of the app
COPY . .

FROM base as production

ENV NODE_PATH=./dist

# Build TypeScript
RUN npm run build

# Install Prisma CLI globally
RUN npm install -g prisma