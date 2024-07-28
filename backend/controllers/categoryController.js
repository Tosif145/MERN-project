import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";


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
})

export {createCategory}