import dotenv from 'dotenv';
import cloudinary from '../config/cloudinary.js';
import path from 'path';

dotenv.config();

const fileFilter = (file, mime, res) => {
  const filetypes = /jpe?g|png|webp|avif/;
  const mimetypes = /image\/jpe?g|image\/png|image\/avif|image\/webp/;

  const extname = path.extname(file).toLowerCase();

  if (!(filetypes.test(extname) && mimetypes.test(mime))) {
    res.status(400).json({ error: 'Images only.' });
    throw new Error('Images only.');
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const file = req.file.originalname;
    const mimetype = req.file.mimetype;
    const buffer = req.file.buffer; 

  
    fileFilter(file, mimetype, res);

    // Upload to Cloudinary using the buffer
    const result =  cloudinary.uploader.upload_stream({ 
      resource_type: 'image',
      folder: 'shopify-images',
    }, (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Cloudinary upload failed.' });
      }
      // console.log(result);
      
      res.status(200).json({ 
        success: true,
        message: 'Image uploaded successfully.',  
        image: result.secure_url 
      });
    }).end(buffer);
    
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: error.message });
  }
};

export default uploadImage;
