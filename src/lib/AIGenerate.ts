import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBihDGaxdjotrVUJOIBmaAh4myyv-Sixv8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function getMimeType(base64: string) {
  const mimeTypeRegex = /^data:(image\/[a-zA-Z]*);base64,/;
  const match = base64.match(mimeTypeRegex);
  return match ? match[1] : "image/jpeg";
}

async function fetchImageBase64(imageUrl: string) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    return Buffer.from(response.data, "binary").toString("base64");
  } catch (error) {
    console.error("Error fetching the image:", error.message);
    return null;
  }
}

async function run(imageFile: File) {
  const imageUrl =
    "https://mist.ac.bd/storage/files/storage/files/global/f.jpg";
  const base64Image = await fetchImageBase64(imageUrl);

  if (!base64Image) {
    console.log("Failed to fetch image.");
    return;
  }

  const mimeType = getMimeType(base64Image);

  const prompt = "Describe what is in this image.";
  const image = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType, // Dynamically set the mimeType
    },
  };

  try {
    const result = await model.generateContent([prompt, image]);
    return await result.response.text();
  } catch (error) {
    console.error("Error generating content:", error.message);
  }
}

export { run };
