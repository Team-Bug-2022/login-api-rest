import cloudinary from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const streamUpload = async (req) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.v2.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  const upload = async (req) => {
    let result = await streamUpload(req);
    return result.url;
  };

  return upload(req);
};

export const deleteImage = async (imageId) => {
  await cloudinary.v2.uploader
    .destroy(imageId)
    .then((result) => console.log(result));
};

export const getImageId = (url) => {
  let startPosition = 0;
  let endPosition = 0;
  for (let i = url.length - 1; i >= 0; i--) {
    if (url[i] === ".") {
      startPosition = i;
    }
    if (url[i] === "/") {
      endPosition = i + 1;
      break;
    }
  }
  return url.slice(endPosition, startPosition);
};
