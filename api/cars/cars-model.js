const db = require('../../data/db-config.js')

const getAll = () => {
  return db('cars')
  // DO YOUR MAGIC
}

const getById = () => {
  // DO YOUR MAGIC 
    return db('cars').where('id', id).first()
  }


const create = () => {
  // DO YOUR MAGIC
  return db('cars').insert(car)
  .then(([id]) => {
    return getById(id)
  })
}

module.exports = {
  getAll,
  getById,
  create,
}
