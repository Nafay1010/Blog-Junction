# Use Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the entire backend directory
COPY . .

# Expose the backend port
EXPOSE 8080

# Start the backend server
CMD ["npm", "run", "server"]