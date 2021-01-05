const express = require('express');

const router = express.Router();

const hotelController = require('../controllers/hotel-controllers');

router.get('/', hotelController.home);
router.get('/details/:id', hotelController.details);

module.exports = router;
