// pages/api/upload.js
import cloudinary from '../../lib/cloudinary';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file } = req.body;

    try {
      const result = await cloudinary.uploader.upload(file, {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      });

      res.status(200).json({ secure_url: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
