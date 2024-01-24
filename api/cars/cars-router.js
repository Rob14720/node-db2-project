const express = require('express');
const router = express.Router();
const cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

// [GET] /api/cars
router.get('/api/cars', (req, res) => {
    // Sort cars by id
    const sortedCars = cars.sort((a, b) => a.id - b.id);

    res.json(sortedCars);
});

router.get('/api/cars/:id', checkCarId, (req, res) => {
    const { id } = req.params;

    const car = cars.find(car => car.id === Number(id));

    if (!car) {
        return res.status(404).json({ message: `Car with id ${id} not found` });
    }

    res.json(car);
});

router.post('/api/cars', checkVinNumberUnique, checkVinNumberValid, checkCarPayload, (req, res) => {
    const car = req.body;

    if (!car.make || !car.model) {
        return res.status(400).json({ message: 'Please provide make and model' });
    }

    car.id = cars.length + 1;

    cars.push(car);

    res.status(201).json(car);
});

// Other CRUD routes (POST, PUT, DELETE) can be added here

module.exports = router;
