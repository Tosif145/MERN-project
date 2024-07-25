import express from 'express';
const router = express.Router();

import { createUser , deleteUser, getAllUsers, getUserById, loginUser, logoutCurrentUser, updateUserProfile, userProfile} from '../controllers/userController.js';
import { authenticateUser,authorizeAdmin } from '../middlewares/authMiddleware.js';





/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create user
 *     description: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 format: password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                   description: Username of the user
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                 isAdmin:
 *                   type: boolean
 */

router.post('/', createUser);




/**
 * @openapi
 * /api/users/auth:
 *   post:
 *     summary: Login user
 *     description: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 format: password
 *     responses:
 *       201:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                   description: Username of the user
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                 isAdmin:
 *                   type: boolean
 *       401:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: Invalid username or password
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */


router.post('/auth',loginUser);

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     summary: User profile
 *     description: Logs out the current user details.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User profile 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User profile
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.get('/profile',authenticateUser,userProfile);


/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Retrieve all users (Admin only)
 *     description: Fetches a list of all users. Requires authentication and admin authorization.
 *     tags:
 *       - Admin
 *     security:
 *       - jwtBearerAuth: []  # Indicates that Bearer token authentication is required
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the user
 *                   username:
 *                     type: string
 *                     description: The username of the user
 *                   email:
 *                     type: string
 *                     description: The email address of the user
 *                   isAdmin:
 *                     type: boolean
 *                     description: Indicates whether the user is an admin
 *       401:
 *         description: Not authorized, Login first
 *       403:
 *         description: Not authorized as an admin
 */

router.get('/',authenticateUser, authorizeAdmin, getAllUsers);



/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     description: Logs out the updated user details.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 format: password
 *     responses:
 *       200:
 *         description: Updated user profile successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Updated user profile successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.put('/profile', authenticateUser, updateUserProfile);

/**
 * @openapi
 * /api/users/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the current user by clearing the JWT cookie.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       400:
 *         description: No user is logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No user is logged in
 */
router.post('/logout',logoutCurrentUser);



/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id (Admin only)
 *     description: Get the user details if current user is admin.
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved  user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                   description: Username of the user
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                 isAdmin:
 *                   type: boolean
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.get('/:id',authenticateUser,authorizeAdmin,getUserById);


/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     description: Delete the user if the user is not admin.
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.delete('/:id', authenticateUser, authorizeAdmin, deleteUser);

export default router;
