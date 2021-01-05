const express = require('express');

const router = express.Router();

const hotelController = require('../controllers/hotel-controllers');

router.get('/', hotelController.home);
router.get('/:id', hotelController.details);
router.delete('/:id', hotelController.deleteOneById);
router.post('/', hotelController.insertOne);
router.put('/', hotelController.updateOne);

module.exports = router;
