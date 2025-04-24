const Reservation = require('../models/Reservation');
const Event = require('../models/Event');

exports.createReservation = async (req, res) => {
  try {
    const { event, numberOfSeats } = req.body;
    const user = req.user.id;

    // Check if event exists
    const eventExists = await Event.findById(event);
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create new reservation
    const reservation = new Reservation({
      user,
      event,
      numberOfSeats
    });

    await reservation.save();

    res.status(201).json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getReservationsByUserId = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.params.userId });
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await reservation.remove();
    res.json({ message: 'Reservation cancelled' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
