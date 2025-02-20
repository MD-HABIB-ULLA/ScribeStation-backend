import { Request, Response } from 'express';
import crypto from 'crypto';
import config from '../../config';

export const generateSignature = async (req: Request, res: Response) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000); // Current timestamp
    const folder = 'user'; // Optional: Specify folder

    // Create the signature string using Cloudinary's API secret
    const signature = crypto
      .createHmac('sha256', process.env.CLOUDINARY_API_SECRET as string)
      .update(`timestamp=${timestamp}&folder=${folder}`)
      .digest('hex');

    res.json({
      signature,
      timestamp,
      folder,
      cloudName: config.cloud_name, // Send cloud name too
      apiKey: config.api_key, // Send API key for frontend
    });

    return;
  } catch (error) {
    console.error('Error generating signature:', error);
    res.status(500).json({ error: 'Failed to generate signature' });
    return;
  }
};
