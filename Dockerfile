# Use official Node.js 14.x image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm run build
# Copy the rest of the application files to the container's working directory
COPY . .


EXPOSE 8000

# Start the application
CMD ["npm", "start"]
