import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const uploadOnCloudinary = async (file: Blob): Promise<string> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "groceries",
          resource_type: "image",
          format: "webp",
          quality: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url as string);
        }
      )
      .end(buffer);
  });
};

export default uploadOnCloudinary;
