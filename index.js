const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost/reservationsalle")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
