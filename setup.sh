#!/bin/bash

# This script assumes you are using Ubuntu or a similar Debian-based system.
# For other operating systems, the commands may vary.

echo "### Starting environment setup for Vue 3 Project ###"

# 1. **Check if Node.js is installed**
echo "Checking if Node.js is installed..."
if ! command -v node &>/dev/null; then
  echo "Node.js not found. Installing Node.js..."
  # Install Node.js and npm
  curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo "Node.js is already installed."
fi

# 2. **Create .env file if it doesn't exist**
if [ ! -f ".env" ]; then
  echo "Creating an empty .env file..."
  touch .env # Create an empty .env file

  # Ask for necessary credentials or configurations
  echo "Please enter the following details to configure the .env file."

  read -p "Google Maps API Key: " VITE_KEY_MAP
  read -p "Base URL (e.g., http://localhost:3001/api): " VITE_BASE_URL
  read -p "Socket.IO URL (e.g., http://localhost:3001): " VITE_SOCKET_IO
  echo

  # Add the configurations to the .env file
  echo "VITE_KEY_MAP=\"$VITE_KEY_MAP\"" >> .env
  echo "VITE_BASE_URL=\"$VITE_BASE_URL\"" >> .env
  echo "VITE_SOCKET_IO=\"$VITE_SOCKET_IO\"" >> .env

  echo ".env configured successfully."
else
  echo ".env already exists."
fi

# 3. **Install project dependencies**
echo "Installing dependencies with npm..."
npm install
echo "Dependencies installed."

# 4. **Start the development server**
echo "### Vue 3 Project setup completed successfully ###"
