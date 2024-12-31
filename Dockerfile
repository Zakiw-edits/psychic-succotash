# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all backend files
COPY . .

# Expose port 5000
EXPOSE 5000

# Set environment variables (Optional, Render handles .env automatically)
ENV PORT=5000

# Start the backend server
CMD ["node", "app.js"]
