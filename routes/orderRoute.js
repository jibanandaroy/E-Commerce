const express = require('express');
const cors = require('cors');
const router = express.Router();

const cartMiddleware = require('../helper/cart')
const {placeOrder,userOrders,listOrders,updateStatus} = require('../controllers/orderController')

router.post('/place',cartMiddleware,placeOrder)
router.post('/userorders',cartMiddleware,userOrders)
router.get('/list',listOrders)
router.post('/status',updateStatus)
module.exports = router; 