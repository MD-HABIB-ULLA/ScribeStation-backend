import { Request, Response, NextFunction } from 'express';
import cloudinary from 'cloudinary';
import config from '../config';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

export const uploadBase64Image = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { image } = req.body; // Get base64 image

    if (image && image.startsWith('data:image')) {
      // Upload to Cloudinary
      const uploadedResponse = await cloudinary.v2.uploader.upload(image, {
        folder: 'users', // Change folder name as needed
      });

      // Replace base64 image with Cloudinary URL
      req.body.image = uploadedResponse.secure_url;
    }

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    res.status(500).json({ message: 'Image upload failed', error });
  }
};
