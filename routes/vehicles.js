const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const vehiclesController = require('../controllers/vehicles');

const vehicleValidationRules = [
    body('dealershipId').notEmpty().withMessage('dealershipId is required').bail().isMongoId().withMessage('must be valid ID'),
    body('make').notEmpty().withMessage('Make is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').notEmpty().withMessage('Year is required').bail().isInt().withMessage('Value provided was not an integer'),
    body('color').notEmpty().withMessage('Color is required'),
    body('mileage').notEmpty().withMessage('Mileage is required').bail().isInt().withMessage('Mileage must be a number'),
    body('vin').notEmpty().withMessage('Vin number is required')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', vehiclesController.getAllVehicles);
router.get('/:id', vehiclesController.getSingleVehicle);

router.post('/', vehicleValidationRules, handleValidationErrors, vehiclesController.createVehicle);
router.put('/:id', vehicleValidationRules, handleValidationErrors, vehiclesController.updateVehicle);
router.delete('/:id', vehiclesController.deleteVehicle);

module.exports = router;