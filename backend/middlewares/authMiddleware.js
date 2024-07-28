import asyncHandler from "./asyncHandler.js"
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";


// Authenticate user
const authenticateUser = asyncHandler( async(req, res, next) => {


    let token;

    token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

    if(token){
        try {
            
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //   console.log('decoded', decoded);
          req.user = await User.findById(decoded.userId).select('-password');
          next();

        } catch (error) {
            res.status(401)
            throw new Error(error)
        }
    }else{
        res.status(401)
       throw new Error('Not authorized, No token')

    }
});



// Admin authentication
const authorizeAdmin = (req, res, next) => {
   if(req.user && req.user.isAdmin){
     next();
   }else{
    return res.status(404).json({message: 'Not authorized as an admin!'})
   }
}

export {authenticateUser, authorizeAdmin};