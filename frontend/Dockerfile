# Use Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the entire frontend directory
COPY . .

# Build the React app
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Serve the React app
CMD ["npm", "run", "start"]