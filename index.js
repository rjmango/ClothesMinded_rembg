import express from "express";
import multer from "multer";
import { Rembg } from "@xixiyahaha/rembg-node";
import sharp from "sharp";
import fs from "fs";

// Setup Express and Multer
const app = express();
const upload = multer({ dest: "uploads/" });
const port = 3000;

app.post("/remove-bg", upload.single("image"), async (req, res) => {
  try {
    const rembg = new Rembg({ logging: true });

    // Load input image
    const inputPath = req.file.path;
    const input = sharp(inputPath);

    // Remove background
    const output = await rembg.remove(input);

    // Convert to webp and output to buffer
    const outputBuffer = await output.webp().toBuffer();

    // Cleanup uploaded file
    fs.unlinkSync(inputPath);

    // Send result
    res.set("Content-Type", "image/webp");
    res.send(outputBuffer);
  } catch (error) {
    console.error("Error removing background:", error);
    res.status(500).send("Failed to process image.");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
