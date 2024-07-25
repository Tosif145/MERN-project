import path from 'path';
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './config/swagger.js';
import { fileURLToPath } from 'url';

// Routes import
import HomeRoutes from './routes/HomeRoutes.js'; 
import userRoutes from './routes/userRoutes.js';



dotenv.config();

// Database connection
connectDB();

// create app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// Use routes
app.get('/', (req, res) =>{
  res.send('Welcome to the API!')
});
app.use('/', HomeRoutes);
app.use('/api/users', userRoutes);




// Swagger implementation
const swaggerSpec = swaggerJSDoc(swaggerOptions);  // Generate Swagger documentation

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use('/api/docs', express.static(path.join(__dirname, 'docs')));
app.get('/api/docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');   // Serve swagger.json dynamically
  res.send(swaggerSpec);
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve Swagger UI



// App listning at port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
