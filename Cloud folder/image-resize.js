import fs from "fs";
import sharp from "sharp";

async function resizeImage() {
  try {
    const inputPath = "./input_image.jpg";   
    const outputPath = "./output_image.jpg"; 

    //Resizing and optimizing the image.
    await sharp(inputPath)
      .resize(400, 300, { fit: "cover" })
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    console.log("Image is resized and saved successfully as output_image.jpg");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

resizeImage();
