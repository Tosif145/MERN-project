import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce web API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        jwtBearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        jwtBearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Correctly use the path
};

export { swaggerOptions };
