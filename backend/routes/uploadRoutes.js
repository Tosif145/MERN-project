import express from 'express';
import multer from 'multer';
import imageUpload from '../controllers/imageController.js'; // Ensure correct import

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), imageUpload);

export default router;
