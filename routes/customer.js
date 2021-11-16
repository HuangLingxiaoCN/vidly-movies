const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')

// Get all
router.get('/', async (req, res) => {
  const customers = await Customer.find()
  res.send(customers)
})

// Get one
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)
  if(!customer) return res.status(404).send('The customer does not exist')
  res.send(customer)
})

// Create one
router.post('/', async (req, res) => {
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  })
  customer = await customer.save()
  res.status(201).send(customer)
})

// Update one
router.put('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)
  customer.isGold = req.body.isGold
  customer.name = req.body.name
  customer.phone = req.body.phone
  await customer.save()
  res.status(201).send(customer)
})

// Delete one
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)
  if(!customer) return res.status(404).send('Customer not found')
  res.send(customer)
})

module.exports = router;