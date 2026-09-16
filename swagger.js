const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vehicles & Dealerships API',
    description: 'CSE 341 Week 3-4 Project API Documentation',
  },
  host: 'cse-weeks3-4.onrender.com',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/vehicles.js', './routes/dealership.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);