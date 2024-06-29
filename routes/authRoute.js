const express = require('express');
const cors = require('cors');
const router = express.Router();
const {registerUser,loginUser,getProfile, logoutUser} = require('../controllers/authController');
  
//....................auth route..............
router.post('/signup', registerUser);
router.post('/login',loginUser);
router.get('/profile',getProfile);
router.get('/logout',logoutUser);

// router.get('/users',getUsers);
// router.delete('/user/:id',removeUser);

module.exports = router;