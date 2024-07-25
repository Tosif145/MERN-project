import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './config/swagger.js';
import { fileURLToPath } from 'url';
import HomeRoutes from './routes/HomeRoutes.js'; // Import routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Generate Swagger documentation
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Use routes
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});
app.use('/api', HomeRoutes);

// Serve swagger.json dynamically before setting up Swagger UI
app.get('/api/docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Serve Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
