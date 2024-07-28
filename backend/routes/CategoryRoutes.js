import express from "express";
const router = express.Router();
import { authenticateUser ,authorizeAdmin} from "../middlewares/authMiddleware.js";
import { createCategory } from "../controllers/categoryController.js";
 

/**
 * @openapi
 * /api/category:
 *   post:
 *     summary: Create category (Admin only)
 *     description: Creating new category
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *     responses:
 *       200:
 *         description: Category created successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                   description: name of the category
 *       422:
 *         description: Name is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: Name is required
 *       409:
 *         description: Category already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category already exist
 */
router.post('/',authenticateUser, authorizeAdmin, createCategory);

export default router;