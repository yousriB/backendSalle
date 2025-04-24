const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, reservationController.createReservation);
router.get('/:id', authMiddleware, reservationController.getReservationById);
router.get('/user/:userId', authMiddleware, reservationController.getReservationsByUserId);
router.delete('/:id', authMiddleware, reservationController.cancelReservation);

module.exports = router;
