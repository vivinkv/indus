# Use official Node.js image as a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY frontend/ .

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
