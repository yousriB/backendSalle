const Event = require("../models/Event");
const { sendApprovalEmail } = require('../utils/mailer'); // Import this

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
      time,
      date,
      duration,
      paymentMethod,
      foodType,
      decorationType,
      numberOfSeats,
      typeEvent,
      local,
      transport = false,
      security = false,
      entertainment = [],
      userId,
      totalPrice
    } = req.body;

    // Basic validation
    if (!title || !time || !date || !duration || !paymentMethod || 
        !foodType || !decorationType || !numberOfSeats || !typeEvent || 
        !local || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate duration is positive number
    if (duration < 1) {
      return res.status(400).json({ message: "Duration must be at least 1 hour" });
    }

    // Validate number of seats is positive
    if (numberOfSeats < 1) {
      return res.status(400).json({ message: "Number of seats must be at least 1" });
    }

    const eventData = {
      title,
      time,
      date: new Date(date),
      duration,
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
    const event = await Event.findById(req.params.id).populate('userId'); // populates user details

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const status = req.body.status;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    event.status = status;
    await event.save();

    if (
      status === 'Approved' &&
      event.userId &&
      event.userId.email
    ) {
      await sendApprovalEmail(
        event.userId.email,
        event.title,
        event.date.toLocaleDateString()
      );
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.updateEvent = async (req, res) => {
  try {
    const {
      title,
      time,
      date,
      foodType,
      decorationType,
      numberOfSeats,
      typeEvent,
      local,
      transport,
      security,
      entertainment,
      totalPrice
    } = req.body;

    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = title || event.title;
    event.time = time || event.time;
    event.date = date || event.date;
    event.foodType = foodType || event.foodType;
    event.decorationType = decorationType || event.decorationType;
    event.numberOfSeats = numberOfSeats || event.numberOfSeats;
    event.typeEvent = typeEvent || event.typeEvent;
    event.local = local || event.local;
    event.transport = transport || event.transport;
    event.security = security || event.security;
    event.entertainment = entertainment || event.entertainment;
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
