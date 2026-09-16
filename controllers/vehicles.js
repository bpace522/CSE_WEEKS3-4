const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const getAllVehicles = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('vehicles').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while retrieving vehicles.' });
  }
};

const getSingleVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    if (!ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Must use a valid vehicle ID to find a vehicle.' });
    }
    const result = await mongodb
      .getDb()
      .collection('vehicles')
      .findOne({ _id: new ObjectId(vehicleId) });

    if (!result) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while retrieving the vehicle.' });
  }
};

const createVehicle = async (req, res) => {
  try {
    const vehicle = {
      dealershipId: new ObjectId(req.body.dealershipId),
      make: req.body.make,
      model: req.body.model,
      year: parseInt(req.body.year),
      color: req.body.color,
      mileage: parseInt(req.body.mileage),
      price: parseFloat(req.body.price),
      vin: req.body.vin
    };

    const response = await mongodb.getDb().collection('vehicles').insertOne(vehicle);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the vehicle.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while creating the vehicle.' });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    if (!ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Must use a valid vehicle ID to update a vehicle.' });
    }
    const vehicle = {
      dealershipId: new ObjectId(req.body.dealershipId),
      make: req.body.make,
      model: req.body.model,
      year: parseInt(req.body.year),
      color: req.body.color,
      mileage: parseInt(req.body.mileage),
      price: parseFloat(req.body.price),
      vin: req.body.vin
    };

    const response = await mongodb
      .getDb()
      .collection('vehicles')
      .replaceOne({ _id: new ObjectId(vehicleId) }, vehicle);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Could not update vehicle or no changes made.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while updating the vehicle.' });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    if (!ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Must use a valid vehicle ID to delete a vehicle.' });
    }
    const response = await mongodb
      .getDb()
      .collection('vehicles')
      .deleteOne({ _id: new ObjectId(vehicleId) });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Vehicle not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while deleting the vehicle.' });
  }
};

module.exports = {
  getAllVehicles,
  getSingleVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle
};