const express = require('express');

const router = express.Router();

const roomController = require('../controllers/room-controllers');

router.get('/:hotelId', roomController.home);
router.get('/details/:hotelId/:roomId', roomController.details);

module.exports = router;
