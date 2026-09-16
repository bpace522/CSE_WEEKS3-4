const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/vehicles', require('./routes/vehicles'));
app.use('/dealerships', require('./routes/dealership'));

app.use('/api-docs', (req, res, next) => {
  swaggerDocument.host = req.get('host');
  swaggerDocument.schemes = [req.protocol];
  req.swaggerDoc = swaggerDocument;
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to db and listening on port ${port}`);
        });
    }
});