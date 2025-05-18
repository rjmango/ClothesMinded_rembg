#!/bin/bash
set -e

echo "Installing Node modules..."
npm install

# Define paths
U2NET_DIR="/opt/render/.u2net"
MODEL_PATH="$U2NET_DIR/u2net.onnx"
MODEL_URL="https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx"

echo "1. Ensuring directory exists..."
mkdir -p "$U2NET_DIR"

echo "2. Downloading model..."
wget -O "$MODEL_PATH" "$MODEL_URL"

echo "3. Verifying download..."
if [ -f "$MODEL_PATH" ]; then
    FILE_SIZE=$(du -h "$MODEL_PATH" | cut -f1)
    echo "✓ Verification passed! File exists at:"
    echo "   Path: $MODEL_PATH"
    echo "   Size: $FILE_SIZE"
else
    echo "✗ Error: File verification failed!"
    echo "  Expected path: $MODEL_PATH"
    exit 1
fi

echo "4. Final checks..."
ls -lh "$U2NET_DIR"  # List directory contents for debugging