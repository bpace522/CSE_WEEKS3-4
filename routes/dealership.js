const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const dealershipController = require('../controllers/dealership');

const dealershipValidationRules = [
    body('name').notEmpty().withMessage('name cannot be empty'),
    body('city').notEmpty().withMessage('city is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('zipCode').notEmpty().withMessage('zip code is required').bail().isInt().withMessage('zipcode must be an integer'),
    body('phone').notEmpty().withMessage('phone number is required'),
    body('website').notEmpty().withMessage('website is required')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', dealershipController.getAllDealerships);
router.get('/:id', dealershipController.getSingleDealership);

router.post('/', dealershipValidationRules, handleValidationErrors, dealershipController.createDealership);
router.put('/:id', dealershipValidationRules, handleValidationErrors, dealershipController.updateDealership);
router.delete('/:id', handleValidationErrors, dealershipController.deleteDealership);

module.exports = router;