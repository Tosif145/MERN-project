import express from 'express';
import multer from 'multer';
import imageUpload from '../controllers/imageController.js'; // Ensure correct import

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


/**
 * @openapi
 * /api/upload:
 *   post:
 *     summary: Upload an image
 *     description: Uploads an image file to Cloudinary. Only image files with specific formats are allowed.
 *     tags:
 *       - Image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the upload was successful
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 image:
 *                   type: string
 *                   description: URL of the uploaded image
 *       400:
 *         description: Bad request, e.g., no file uploaded or invalid file type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post('/', upload.single('image'), imageUpload);

export default router;
