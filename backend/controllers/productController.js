import asyncHandler from "../middlewares/asyncHandler.js";
import Product from '../models/productModel.js';


// Add product
const addProduct = asyncHandler( async(req, res) =>{
    try {
        const {name, description, price , category, quantity, brand} = req.fields;
        

        // validation
        switch(true){
            case !name || !name.trim():
                return res.status(422).json({error: 'Name is required!'});
            case !description || !description.trim():
                return res.status(422).json({error: 'Description is required!'});
            case !price || price <= 0:
                return res.status(422).json({error: 'Price should be a positive number!'});
            case !category ||!category.trim():
                return res.status(422).json({error: 'Category is required!'});
            case !quantity || quantity <= 0:
                return res.status(422).json({error: 'Quantity should be a positive number!'});
            case !brand ||!brand.trim():
                return res.status(422).json({error: 'Brand is required!'});
            default:
                break;
        }

        const product = new Product({...req.fields});
        await product.save();
        return res.status(200).json({
            id: product.id,
            name,
            description,
            price,
            category,
            quantity,
            brand,
            message: 'Product added successfully'
        })


    } catch (error) {
        console.error(error);
        res.status(500).json(error.message)
    }
});

const updateProductDetails = asyncHandler(async(req, res) =>{
    try {
        const {name, description, price , category, quantity, brand, image} = req.fields;

        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({error: 'Product not found!'});
        }

        if(product){
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.quantity = quantity || product.quantity;
            product.brand = brand || product.brand;
            product.image = image || product.image;
        }

        const updatedProduct = await product.save();
   

        return res.status(200).json({
            id: updatedProduct.id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            category: updatedProduct.category,
            quantity: updatedProduct.quantity,
            brand: updatedProduct.brand,
            message: 'Product updated successfully'
        })


    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
});

// Fetch products
const fetchProducts = asyncHandler(async(req, res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: "i"}} : {};

        const count = await Product.countDocuments({...keyword});
        const products = await Product.find({...keyword}).limit(pageSize);

        res.status(200).json({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: false,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
});

// Fetch product by id
const fetchProductsById = asyncHandler(async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            res.status(404)
            throw new Error('Product not found!');
        }

        return res.status(200).json({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            quantity: product.quantity,
            brand: product.brand,
            image: product.image,
            message: 'Product fetched successfully' 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
});

// Fetch all products
const fetchAllProducts = asyncHandler(async (req, res) => {

    try {
        const products = await Product.find({}).populate('category').limit(12).sort({createAt: -1});

        if(!products){
            return res.status(404).json({error: 'No products found!'});
        }

        return res.status(200).json(products);
        
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
});


//Remove product
const removeProduct = asyncHandler( async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({error: 'Product not found!'});
        }

        return res.status(200).json({
            name: product.name,
            message: `Product ${product.name} has been deleted.`
        })
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

// Add review
const addProductReview = asyncHandler(async(req, res) => {
    try {
        const {rating,comment} = req.body;
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({error: 'Product not found!'});
        }

        const alreadyReviewed = product.reviews.find( (r) => r.user.toString() === req.user._id.toString() );
        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed');
        }
        
        const review = {     
             name: req.user.username,
             rating: Number(rating),
             comment,
             user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();

        return res.status(201).json({
            message: 'Review added successfully',
            product: product.id
        })

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message)
    }
    }
);

export {
  addProduct,
  updateProductDetails,
  fetchProducts,
  fetchProductsById,
  fetchAllProducts,
  removeProduct,
  addProductReview,
} 