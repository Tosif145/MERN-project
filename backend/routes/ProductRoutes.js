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

router.post('/',authenticateUser, authorizeAdmin,formidable() ,addProduct);

router.get('/allproducts', fetchAllProducts);

router.get('/top', fetchTopProducts);

router.get('/new', fetchNewProducts);

router.put('/:id',authenticateUser, authorizeAdmin, formidable(), updateProductDetails);

router.post('/:id/reviews', authenticateUser,checkId,addProductReview);

router.get('/',fetchProducts);

router.get('/:id', fetchProductsById);



router.delete('/:id', authenticateUser, authorizeAdmin, formidable() ,removeProduct);

export default router;

