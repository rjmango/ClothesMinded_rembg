#!/bin/bash
set -e

echo "Installing Node modules..."
npm install

# Ensure home directory exists (especially important in Docker)
mkdir -p "$(node -p "require('os').homedir()")"

# Download file
wget -O "root" \
     https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx

# Verify download succeeded
if [ ! -f "$(node -p "require('os').homedir()")/u2net.onnx" ]; then
    echo "Error: File download failed!"
    exit 1
fi