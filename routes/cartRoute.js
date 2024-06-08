const express = require('express');
const cors = require('cors');
const router = express.Router();
const {addToCart} = require('../controllers/cartController')

router.post('/addtocart',addToCart);

module.exports = router;