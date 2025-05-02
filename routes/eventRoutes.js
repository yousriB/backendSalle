const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/all", eventController.getAllEvents); //tjib el event el kol 
router.get("/:id", eventController.getEventById);
router.post("/create", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.put("/status/:id", eventController.updateEventStatus);
router.delete("/:id", eventController.deleteEvent);
router.get("/user/:userId", eventController.getEventsByUserId);
module.exports = router;
