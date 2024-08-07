import express from "express";
import formidable from 'express-formidable';
import checkId from '../middlewares/checkId.js';
const router = express.Router();

import { authenticateUser, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
         addProduct,
         updateProductDetails,
         removeProduct,
         fetchProducts,
         fetchProductsById,
         fetchAllProducts,
         addProductReview,
         fetchTopProducts,
         fetchNewProducts
     } from "../controllers/productController.js";
     

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product to the inventory. Requires admin authorization.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - quantity
 *               - brand
 *               - countInStock
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               description:
 *                 type: string
 *                 description: Description of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               category:
 *                 type: string
 *                 description: Category of the product
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *               brand:
 *                 type: string
 *                 description: Brand of the product
 *               countInStock:
 *                 type: number
 *                 description: Count of the product in stock
 *               image:
 *                 type: string
 *                 description: Image of the product
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the product
 *                 name:
 *                   type: string
 *                   description: Name of the product
 *                 description:
 *                   type: string
 *                   description: Description of the product
 *                 price:
 *                   type: number
 *                   description: Price of the product
 *                 category:
 *                   type: string
 *                   description: Category of the product
 *                 quantity:
 *                   type: number
 *                   description: Quantity of the product
 *                 brand:
 *                   type: string
 *                   description: Brand of the product
 *                 countInStock:
 *                   type: number
 *                   description: Count of the product in stock
 *                 image:
 *                   type: string
 *                   description: Image URL of the product
 *                 message:
 *                   type: string
 *                   description: Success message
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Image is required!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post('/',authenticateUser, authorizeAdmin,formidable() ,addProduct);

/**
 * @openapi
 * /api/products/allproducts:
 *   get:
 *     summary: Fetch all products
 *     description: Retrieves a list of all products, sorted by creation date in descending order and limited to 12 results.
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID of the product
 *                   name:
 *                     type: string
 *                     description: Name of the product
 *                   description:
 *                     type: string
 *                     description: Description of the product
 *                   price:
 *                     type: number
 *                     description: Price of the product
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the category
 *                       name:
 *                         type: string
 *                         description: Name of the category
 *                   quantity:
 *                     type: number
 *                     description: Quantity of the product
 *                   brand:
 *                     type: string
 *                     description: Brand of the product
 *                   image:
 *                     type: string
 *                     description: Image URL of the product
 *                   countInStock:
 *                     type: number
 *                     description: Count of the product in stock
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "No products found!"
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
 *               example:
 *                 error: "Internal server error"
 */
router.get('/allproducts', fetchAllProducts);

/**
 * @openapi
 * /api/products/top:
 *   get:
 *     summary: Get top-rated products
 *     description: Retrieves the top 4 products based on rating.
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: List of top-rated products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID of the product
 *                   name:
 *                     type: string
 *                     description: Name of the product
 *                   description:
 *                     type: string
 *                     description: Description of the product
 *                   price:
 *                     type: number
 *                     description: Price of the product
 *                   category:
 *                     type: string
 *                     description: Category of the product
 *                   quantity:
 *                     type: number
 *                     description: Quantity of the product
 *                   brand:
 *                     type: string
 *                     description: Brand of the product
 *                   image:
 *                     type: string
 *                     description: Image URL of the product
 *                   countInStock:
 *                     type: number
 *                     description: Count of the product in stock
 *                   rating:
 *                     type: number
 *                     description: Rating of the product
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "No products found!"
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Internal server error"
 */
router.get('/top', fetchTopProducts);

/**
 * @openapi
 * /api/products/new:
 *   get:
 *     summary: Get new products
 *     description: Retrieves the 5 most recently added products.
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: List of new products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID of the product
 *                   name:
 *                     type: string
 *                     description: Name of the product
 *                   description:
 *                     type: string
 *                     description: Description of the product
 *                   price:
 *                     type: number
 *                     description: Price of the product
 *                   category:
 *                     type: string
 *                     description: Category of the product
 *                   quantity:
 *                     type: number
 *                     description: Quantity of the product
 *                   brand:
 *                     type: string
 *                     description: Brand of the product
 *                   image:
 *                     type: string
 *                     description: Image URL of the product
 *                   countInStock:
 *                     type: number
 *                     description: Count of the product in stock
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "No products found!"
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Internal server error"
 */
router.get('/new', fetchNewProducts);

/**
 * @openapi
 * /api/products/update/{id}:
 *   put:
 *     summary: Update product details
 *     description: Update the details of an existing product. Requires admin authorization.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - quantity
 *               - brand
 *               - countInStock
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               description:
 *                 type: string
 *                 description: Description of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               category:
 *                 type: string
 *                 description: Category of the product
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *               brand:
 *                 type: string
 *                 description: Brand of the product
 *               countInStock:
 *                 type: number
 *                 description: Count of the product in stock
 *               image:
 *                 type: string
 *                 description: Image of the product
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the product
 *                 name:
 *                   type: string
 *                   description: Name of the product
 *                 description:
 *                   type: string
 *                   description: Description of the product
 *                 price:
 *                   type: number
 *                   description: Price of the product
 *                 category:
 *                   type: string
 *                   description: Category of the product
 *                 quantity:
 *                   type: number
 *                   description: Quantity of the product
 *                 brand:
 *                   type: string
 *                   description: Brand of the product
 *                 countInStock:
 *                   type: number
 *                   description: Count of the product in stock
 *                 image:
 *                   type: string
 *                   description: Image URL of the product
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Product not found!"
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Name is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.put('/update/:id',authenticateUser, authorizeAdmin, formidable(), updateProductDetails);

/**
 * @openapi
 * /api/products/{id}/reviews:
 *   post:
 *     summary: Add a review to a product
 *     description: Adds a review with a rating and comment to a specific product. Requires user authentication.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to review
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Rating given to the product (1-5)
 *               comment:
 *                 type: string
 *                 description: Comment about the product
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 product:
 *                   type: string
 *                   description: ID of the product reviewed
 *       400:
 *         description: Bad request or already reviewed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Product already reviewed"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Product not found!"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Unauthorized"
 */
router.post('/:id/reviews', authenticateUser,checkId,addProductReview);


/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Fetch a list of products
 *     description: Retrieves a paginated list of products, optionally filtered by a search keyword.
 *     tags:
 *       - Product
 *     parameters:
 *       - name: keyword
 *         in: query
 *         description: Search keyword to filter products by name
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the product
 *                       name:
 *                         type: string
 *                         description: Name of the product
 *                       description:
 *                         type: string
 *                         description: Description of the product
 *                       price:
 *                         type: number
 *                         description: Price of the product
 *                       category:
 *                         type: string
 *                         description: Category of the product
 *                       quantity:
 *                         type: number
 *                         description: Quantity of the product
 *                       brand:
 *                         type: string
 *                         description: Brand of the product
 *                       countInStock:
 *                         type: number
 *                         description: Count of the product in stock
 *                       image:
 *                         type: string
 *                         description: Image URL of the product
 *                 page:
 *                   type: number
 *                   description: Current page number
 *                 pages:
 *                   type: number
 *                   description: Total number of pages
 *                 hasMore:
 *                   type: boolean
 *                   description: Indicates if there are more products to load
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
 *               example:
 *                 error: "Server Error"
 */

router.get('/',fetchProducts);


/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Fetch a product by ID
 *     description: Retrieves details of a specific product based on its ID.
 *     tags:
 *       - Product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the product
 *                 name:
 *                   type: string
 *                   description: Name of the product
 *                 description:
 *                   type: string
 *                   description: Description of the product
 *                 price:
 *                   type: number
 *                   description: Price of the product
 *                 category:
 *                   type: string
 *                   description: Category of the product
 *                 quantity:
 *                   type: number
 *                   description: Quantity of the product
 *                 brand:
 *                   type: string
 *                   description: Brand of the product
 *                 image:
 *                   type: string
 *                   description: Image URL of the product
 *                 countInStock:
 *                   type: number
 *                   description: Count of the product in stock
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Product not found!"
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
 *               example:
 *                 error: "Internal server error"
 */
router.get('/:id', fetchProductsById);


/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Deletes a specific product based on its ID. Requires admin authorization.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the deleted product
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Product not found!"
 *       400:
 *         description: Bad request / Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: "Internal server error"
 */
router.delete('/:id', authenticateUser, authorizeAdmin, formidable() ,removeProduct);

export default router;

