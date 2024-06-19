const express = require('express');
const router = express.Router();
const {addToCart, removeFromCart, getCart} = require('../controllers/cartController')
const cartMiddleware = require('../helper/cart')

router.post('/add',cartMiddleware,addToCart)
router.post('/remove',cartMiddleware,removeFromCart)
router.post('/get',cartMiddleware,getCart)

module.exports = router;