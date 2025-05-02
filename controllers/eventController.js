const Event = require("../models/Event");

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
    const data = req.body;

    const event = new Event(data);

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.updateEventStatus = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    // Ensure you're correctly extracting the status from the body
    const status = req.body.status;

    // Check if the status is valid
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    event.status = status;
    await event.save();
    res.json(event);  // Respond with the updated event
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

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.remove();
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
