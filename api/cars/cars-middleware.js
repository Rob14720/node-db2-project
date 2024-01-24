const checkCarId = (req, res, next) => {
  const carId = req.params.id
  if (!carId) {
    next({ status: 404, message: 'car not found' })
  } else {
    next()
  }
  // DO YOUR MAGIC
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;

  if (!vin || !make || !model || !mileage) {
    return res.status(400).json({ message: 'Missing required car data' });
  }

  if (typeof vin !== 'string' || typeof make !== 'string' || typeof model !== 'string') {
    return res.status(400).json({ message: 'Invalid car data type' });
  }

  if (typeof mileage !== 'number' || mileage < 0) {
    return res.status(400).json({ message: 'Invalid mileage value' });
  }

  next();
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;

  if (!vin) {
    return res.status(400).json({ message: 'vin is missing' });
  }

  if (vin.length !== 17) {
    return res.status(400).json({ message: 'vin must be 17 characters' });
  }

  next();
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  Car.getByVin(vin)
    .then(car => {
      if (car) {
        return res.status(400).json({ message: 'vin <vin number> already exists' });
      }
      next();
    })
    .catch(next);
}
