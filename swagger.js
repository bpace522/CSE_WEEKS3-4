const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vehicles & Dealerships API',
    description: 'CSE 341 Week 3-4 Project API Documentation',
  },
  host: 'localhost:8080',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/vehicles.js', './routes/dealership.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);