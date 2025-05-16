import express from "express";
import multer from "multer";
import { Rembg } from "@xixiyahaha/rembg-node";
import sharp from "sharp";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });
const port = 3000;

app.post("/remove-bg", upload.single("image"), async (req, res) => {
  console.log("File received:", req.file); // Log the file object
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  try {
    const rembg = new Rembg({ logging: true });

    // Read input image
    const inputPath = req.file.path;
    const input = sharp(inputPath);

    // Remove background
    const output = await rembg.remove(input);

    // Convert to webp and output to buffer
    const outputBuffer = await output.webp().toBuffer();

    // Cleanup uploaded file
    fs.unlinkSync(inputPath);

    // Encode buffer to base64
    const base64Output = outputBuffer.toString("base64").replace(/\n|\r/g, "");

    console.log("Base64 output:", base64Output); // Log the base64 string

    // Send result
    res.set("Content-Type", "application/json");
    res.send({ base64: base64Output });
    console.log("Background removed and encoded successfully.");
  } catch (error) {
    console.error("Error removing background:", error);
    res.status(500).send("Failed to process image.");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});