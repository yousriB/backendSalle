const OtherOption = require('../models/OtherOption');

// Add a new other option
exports.addOtherOption = async (req, res) => {
  try {
    const newOtherOption = new OtherOption(req.body);
    const savedOtherOption = await newOtherOption.save();
    res.status(201).json(savedOtherOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all other options
exports.getOtherOptions = async (req, res) => {
  try {
    const otherOptions = await OtherOption.find();
    res.json(otherOptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific other option by value
exports.getOtherOption = async (req, res) => {
  try {
    const otherOption = await OtherOption.findOne({ value: req.params.value });
    if (!otherOption) {
      return res.status(404).json({ message: 'Cannot find other option' });
    }
    res.json(otherOption);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a other option
exports.updateOtherOption = async (req, res) => {
  try {
    const updatedOtherOption = await OtherOption.findOneAndUpdate({ value: req.params.value }, req.body, { new: true });
    if (!updatedOtherOption) {
      return res.status(404).json({ message: 'Cannot find other option' });
    }
    res.json(updatedOtherOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a other option
exports.deleteOtherOption = async (req, res) => {
  try {
    const otherOption = await OtherOption.findOneAndDelete({ value: req.params.value });
    if (!otherOption) {
      return res.status(404).json({ message: 'Cannot find other option' });
    }
    res.json({ message: 'Deleted other option' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
