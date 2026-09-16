const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const getAllDealerships = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('dealerships').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while retrieving dealerships.' });
  }
};

const getSingleDealership = async (req, res) => {
  try {
    const dealershipId = req.params.id;
    if (!ObjectId.isValid(dealershipId)) {
      return res.status(400).json({ message: 'Must use a valid dealership ID.' });
    }
    const result = await mongodb
      .getDb()
      .collection('dealerships')
      .findOne({ _id: new ObjectId(dealershipId) });

    if (!result) {
      return res.status(404).json({ message: 'Dealership not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while retrieving the dealership.' });
  }
};

const createDealership = async (req, res) => {
  try {
    const dealership = {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      phone: req.body.phone,
      website: req.body.website
    };

    const response = await mongodb.getDb().collection('dealerships').insertOne(dealership);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the dealership.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while creating the dealership.' });
  }
};

const updateDealership = async (req, res) => {
  try {
    const dealershipId = req.params.id;
    if (!ObjectId.isValid(dealershipId)) {
      return res.status(400).json({ message: 'Must use a valid dealership ID.' });
    }
    const dealership = {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      phone: req.body.phone,
      website: req.body.website
    };

    const response = await mongodb
      .getDb()
      .collection('dealerships')
      .replaceOne({ _id: new ObjectId(dealershipId) }, dealership);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Could not update dealership or no changes made.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while updating the dealership.' });
  }
};

const deleteDealership = async (req, res) => {
  try {
    const dealershipId = req.params.id;
    if (!ObjectId.isValid(dealershipId)) {
      return res.status(400).json({ message: 'Must use a valid dealership ID.' });
    }
    const response = await mongodb
      .getDb()
      .collection('dealerships')
      .deleteOne({ _id: new ObjectId(dealershipId) });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Dealership not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while deleting the dealership.' });
  }
};

module.exports = {
  getAllDealerships,
  getSingleDealership,
  createDealership,
  updateDealership,
  deleteDealership
};