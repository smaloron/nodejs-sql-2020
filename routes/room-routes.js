const express = require('express');

const router = express.Router();

const roomController = require('../controllers/room-controllers');

router.get('/:hotelId', roomController.home);
router.get('/details/:roomId', roomController.details);
router.delete('/:id', roomController.deleteOne);

module.exports = router;
