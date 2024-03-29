# Use official Node.js 14.x image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install react-scripts
RUN npm install -g react-scripts

# Copy the rest of the application files to the container's working directory
COPY . .

# Expose port 8000
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
