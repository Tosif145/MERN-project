import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from "bcryptjs";
import createToken from '../utils/createToken.js';


// Get all user (Admin only)
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});
    return res.status(200).json(users);
})


// Create or register user

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password,isAdmin } = req.body;
    
    if( !username || !email || !password ){
        throw new Error('Please fill all the inputs.');
    }

    const userExists = await User.findOne({email});
    
    if(userExists){
       return res.status(409).send({message: 'User already exists'});
        
    }

    const salt =  await bcrypt.genSalt(10);
    // console.log("Salt: " + salt);
    const hashedPasswod = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username,
        email,
        password: hashedPasswod,
        isAdmin
    })

    try {
        await newUser.save();

        createToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            message: 'User created successfully'
        })
        
    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data.");
    }
});


// User login
const loginUser =  asyncHandler( async(req, res) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        const isValidPassword = await bcrypt.compare(password,  existingUser.password);

        if(isValidPassword){
            const token = createToken(res, existingUser._id);

            return res.status(201).json({
            token:token,
            message: 'User login successfull'
            })
        }else{
            return res.status(401).json( {message: 'Invalid username or password'});
            
        }
    }else{
       return res.status(404).json({message: 'User not found'});
    }
    
});


// User logout

const logoutCurrentUser = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(400).json({ message: 'No user is logged in' });
    }

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    return res.status(200).json({ message: 'Logged out successfully' });
});


// Get user profile
const userProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id: user._id,
            username : user.username,
            email: user.email
        })
    }else{
       res.status(404)
       throw new Error('User not found');
    }
})

// Update user profile

const updateUserProfile = asyncHandler( async(req, res) => {
     const user = await User.findById(req.user._id);

     if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);

            const hashedPasswod = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPasswod;
        }

        const updatedUser = await user.save();
        
        return res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            message: 'Updated user profile successfully'
        })

     }else{
        res.status(404)
        throw new Error('User not found');
     }
});




// Get user by Id (Admin only)
const getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if(user){
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found');
    }
})


// Delete user (Admin only)

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        if(user.isAdmin){
            res.status(404)
            throw new Error('Cannot delete admin user');
        }

        await user.deleteOne({_id: user._id});

        return res.status(200).json({
            message: 'User removed successfully'
        })
    }else{
        res.status(404)
        throw new Error('User not found');
    }
})

export  {createUser, loginUser,logoutCurrentUser, getAllUsers,userProfile,updateUserProfile, deleteUser,getUserById};

