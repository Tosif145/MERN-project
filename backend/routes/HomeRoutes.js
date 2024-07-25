import express from 'express';
const router = express.Router();

/**
 * @openapi
 * /api:
 *   get:
 *     summary: Welcome message
 *     description: Create a new user
 *     tags:
 *       - Home
 *     responses:
 *       200:
 *         description: A welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to the API!
 */
router.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

export default router;
