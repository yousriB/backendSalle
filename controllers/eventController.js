const Event = require("../models/Event");
const { sendEmail } = require('../utils/mailer'); // Import this

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getEventsByUserId = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { 
      title,
      date,
      paymentMethod,
      foodType,
      decorationType,
      numberOfSeats,
      typeEvent,
      local,
      transport = false,
      security = false,
      entertainment = [],
      others = [],
      userId,
      totalPrice
    } = req.body;

    // Basic validation
    if (!title || !date || !paymentMethod || 
        !foodType || !decorationType || !numberOfSeats || !typeEvent || 
        !local || !userId ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate number of seats is positive
    if (numberOfSeats < 1) {
      return res.status(400).json({ message: "Number of seats must be at least 1" });
    }

    const bookingDate = new Date(date);

    // Check for existing approved event on the same date
    const existingEvent = await Event.findOne({
      date: bookingDate,
      status: 'Approved'
    });

    if (existingEvent) {
      return res.status(409).json({ message: "This date is reserved" });
    }

    const eventData = {
      title,
      date: bookingDate,
      paymentMethod,
      foodType,
      decorationType,
      numberOfSeats,
      typeEvent,
      local,
      transport,
      security,
      entertainment,
      userId,
      totalPrice
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
      message: "Event created successfully",
      event: {
        id: event._id,
        title: event.title,
        date: event.date,
        status: event.status,
        totalPrice: event.totalPrice
      }
    });
  } catch (err) {
    console.error(err.message);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error",
        errors: err.errors 
      });
    }
    
    res.status(500).json({ 
      message: "Server error",
      error: err.message 
    });
  }
};

exports.updateEventStatus = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('userId');

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const status = req.body.status;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    event.status = status;
    await event.save();

    if (event.userId && event.userId.email) {
      const emailData = {
        bookingTitle: event.title,
        bookingDate: event.date.toLocaleDateString()
      };

      if (status === 'Approved') {
        await sendEmail(event.userId.email, 'bookingApproval', emailData);
      } else if (status === 'Rejected') {
        await sendEmail(event.userId.email, 'bookingRejection', emailData);
      }
    }

    res.json(event);
  } catch (err) {
    console.error('Error updating event status:', err.message);
    res.status(500).send("Server error");
  }
};
exports.updateEvent = async (req, res) => {
  try {
    const {
      title,
      date,
      foodType,
      decorationType,
      numberOfSeats,
      typeEvent,
      local,
      transport,
      security,
      entertainment,
      others,
      totalPrice
    } = req.body;

    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = title || event.title;
    event.date = date || event.date;
    event.foodType = foodType || event.foodType;
    event.decorationType = decorationType || event.decorationType;
    event.numberOfSeats = numberOfSeats || event.numberOfSeats;
    event.typeEvent = typeEvent || event.typeEvent;
    event.local = local || event.local;
    event.transport = transport || event.transport;
    event.security = security || event.security;
    event.entertainment = entertainment || event.entertainment;
    event.others = others || event.others;
    event.totalPrice = totalPrice || event.totalPrice;
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
