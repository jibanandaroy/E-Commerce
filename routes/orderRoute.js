const express = require('express');
const cors = require('cors');
const router = express.Router();

const cartMiddleware = require('../helper/cart')
const {placeOrder} = require('../controllers/orderController')

router.post('/place',cartMiddleware,placeOrder)

module.exports = router;