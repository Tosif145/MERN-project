import express from "express";
const router = express.Router();
import { authenticateUser ,authorizeAdmin} from "../middlewares/authMiddleware.js";
import { createCategory, deleteCategory, getAllCategories, readCategory, updateCategory } from "../controllers/categoryController.js";
 

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


/**
 * @openapi
 * /api/category/{categoryId}:
 *   put:
 *     summary: Update category (Admin only)
 *     description: Update existing category
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
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category updated successful
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
 *       400:
 *         description: Name is required or Invalid Id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: Name is required
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category not found
 */
router.put('/:categoryId',authenticateUser, authorizeAdmin, updateCategory);



/**
 * @openapi
 * /api/category/categories:
 *   get:
 *     summary: Retrieve all categoriers (Admin only)
 *     description: Fetches a list of all categoriers. Requires authentication and admin authorization.
 *     tags:
 *       - Category
 *     security:
 *       - jwtBearerAuth: []  # Indicates that Bearer token authentication is required
 *     responses:
 *       200:
 *         description: Successfully retrieved all categoriers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the category
 *                   name:
 *                     type: string
 *                     description: The name of the user
 *       401:
 *         description: Not authorized, Login first
 *       403:
 *         description: Not authorized as an admin
 */

router.get('/categories',authenticateUser, authorizeAdmin, getAllCategories);

/**
 * @openapi
 * /api/category/{id}:
 *   get:
 *     summary: Retrieve  category (Admin only)
 *     description: Fetch the category. Requires authentication and admin authorization.
 *     tags:
 *       - Category
 *     security:
 *       - jwtBearerAuth: []  # Indicates that Bearer token authentication is required
  *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the category
 *         content:
 *           application/json:
 *             schema:
 *               type: Object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the category
 *                 name:
 *                   type: string
 *                   description: The name of the category
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category not found
 *       401:
 *         description: Not authorized, Login first
 *       403:
 *         description: Not authorized as an admin
 */
router.get('/:id',authenticateUser, authorizeAdmin, readCategory);


/**
 * @openapi
 * /api/category/{categoryId}:
 *   delete:
 *     summary: Delete Category (Admin only)
 *     description: Delete the category if the user is admin.
 *     tags:
 *       - Category
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category deleted successfully
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category not found
 */
router.delete('/:categoryId',authenticateUser, authorizeAdmin, deleteCategory);

export default router;