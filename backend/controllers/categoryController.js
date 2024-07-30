import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";


//  Create a new category`
const createCategory = asyncHandler( async (req, res) => {
    try {
        const {name } = req.body;
        if(!name || !name.trim()){
            return res.status(422).json({error: 'Name is required!'});
        }

        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(409).json({error: 'Category already exists!'});
        }

        const category = await new Category({name}).save();

        return res.status(200).json({
            id: category.id,
            name: category.name,
            message: 'Category created successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
});


// Update existing category by id
const updateCategory = asyncHandler( async (req, res)  => {
    try {
        const {categoryId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
          }
        const category = await Category.findById(categoryId);
        const {name} = req.body;

        if(!category){
            return res.status(404).json({error: 'Category not found!'});
        }

        category.name = name || category.name;
        const newCategory = await category.save();

        return res.status(200).json({ 
            id: newCategory._id,
            name: newCategory.name,
            message: 'Category updated successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});


// Get all categories
const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({});

        return res.status(200).json({
            categories,
            message: 'Categories fetched successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});


// Delete category by id
const deleteCategory = asyncHandler(async (req, res) => {
    try {

        const {categoryId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        
        const removed = await Category.findByIdAndDelete(categoryId);
        if(!removed){
            return res.status(404).json({error: 'Category not found!'});
        }
        return res.status(200).json({
            message: 'Category removed successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

// Get category by id
const readCategory = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const category = await Category.findById({_id: id});

        if (!category) {
            return res.status(404).json({error: 'Category not found!'});
        }

        return res.status(200).json({
            _id: category._id,
            name: category.name,
            message: 'Category fetched successfully'
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});


export {
         createCategory,
         updateCategory,
         getAllCategories,
         readCategory,
         deleteCategory
      } 


    