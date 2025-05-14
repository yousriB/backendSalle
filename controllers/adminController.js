const FoodOption = require('../models/FoodOption');
const LocationOption = require('../models/LocationOption');
const DecorationOption = require('../models/DecorationOption');
const EntertainmentOption = require('../models/EntertainmentOption');
const OtherOption = require('../models/OtherOption');

// Food Options
exports.getFoodOptions = async (req, res) => {
  try {
    const options = await FoodOption.find().sort({ createdAt: -1 });
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addFoodOption = async (req, res) => {
  try {
    const { label, value, image, price } = req.body;
    
    const newOption = new FoodOption({
      label,
      value,
      image,
      price
    });

    const savedOption = await newOption.save();
    res.status(201).json(savedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateFoodOption = async (req, res) => {
  try {
    const { value } = req.params;
    const { label, image, price } = req.body;

    const updatedOption = await FoodOption.findOneAndUpdate(
      { value },
      { label, image, price },
      { new: true }
    );

    if (!updatedOption) {
      return res.status(404).json({ message: 'Food option not found' });
    }

    res.json(updatedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteFoodOption = async (req, res) => {
  try {
    const { value } = req.params;
    const deletedOption = await FoodOption.findOneAndDelete({ value });

    if (!deletedOption) {
      return res.status(404).json({ message: 'Food option not found' });
    }

    res.json({ message: 'Food option deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Location Options (similar structure as food options)
exports.getLocationOptions = async (req, res) => {
  try {
    const options = await LocationOption.find().sort({ createdAt: -1 });
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addLocationOption = async (req, res) => {
  try {
    const { label, value, image, price } = req.body;
    
    const newOption = new LocationOption({
      label,
      value,
      image,
      price
    });

    const savedOption = await newOption.save();
    res.status(201).json(savedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateLocationOption = async (req, res) => {
  try {
    const { value } = req.params;
    const { label, image, price } = req.body;

    const updatedOption = await LocationOption.findOneAndUpdate(
      { value },
      { label, image, price },
      { new: true }
    );

    if (!updatedOption) {
      return res.status(404).json({ message: 'Location option not found' });
    }

    res.json(updatedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLocationOption = async (req, res) => {
  try {
    const { value } = req.params;
    const deletedOption = await LocationOption.findOneAndDelete({ value });

    if (!deletedOption) {
      return res.status(404).json({ message: 'Location option not found' });
    }

    res.json({ message: 'Location option deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Decoration Options (similar structure)
exports.getDecorationOptions = async (req, res) => {
  try {
    const options = await DecorationOption.find().sort({ createdAt: -1 });
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addDecorationOption = async (req, res) => {
  try {
    const { label, value, image, price } = req.body;
    
    const newOption = new DecorationOption({
      label,
      value,
      image,
      price
    });

    const savedOption = await newOption.save();
    res.status(201).json(savedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateDecorationOption = async (req, res) => {
  try {
    const { value } = req.params;
    const { label, image, price } = req.body;

    const updatedOption = await DecorationOption.findOneAndUpdate(
      { value },
      { label, image, price },
      { new: true }
    );

    if (!updatedOption) {
      return res.status(404).json({ message: 'Decoration option not found' });
    }

    res.json(updatedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDecorationOption = async (req, res) => {
  try {
    const { value } = req.params;
    const deletedOption = await DecorationOption.findOneAndDelete({ value });

    if (!deletedOption) {
      return res.status(404).json({ message: 'Decoration option not found' });
    }

    res.json({ message: 'Decoration option deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Entertainment Options
exports.getEntertainmentOptions = async (req, res) => {
  try {
    const options = await EntertainmentOption.find().sort({ createdAt: -1 });
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addEntertainmentOption = async (req, res) => {
  try {
    const { label, value, image, price } = req.body;
    
    const newOption = new EntertainmentOption({
      label,
      value,
      image,
      price
    });

    const savedOption = await newOption.save();
    res.status(201).json(savedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEntertainmentOption = async (req, res) => {
  try {
    const { value } = req.params;
    const { label, image, price } = req.body;

    const updatedOption = await EntertainmentOption.findOneAndUpdate(
      { value },
      { label, image, price },
      { new: true }
    );

    if (!updatedOption) {
      return res.status(404).json({ message: 'Entertainment option not found' });
    }

    res.json(updatedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEntertainmentOption = async (req, res) => {
  try {
    const { value } = req.params;
    const deletedOption = await EntertainmentOption.findOneAndDelete({ value });

    if (!deletedOption) {
      return res.status(404).json({ message: 'Entertainment option not found' });
    }

    res.json({ message: 'Entertainment option deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Other Options
exports.getOtherOptions = async (req, res) => {
  try {
    const options = await OtherOption.find().sort({ createdAt: -1 });
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addOtherOption = async (req, res) => {
  try {
    const { label, value, image, price } = req.body;
    
    const newOption = new OtherOption({
      label,
      value,
      image,
      price
    });

    const savedOption = await newOption.save();
    res.status(201).json(savedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOtherOption = async (req, res) => {
  try {
    const { value } = req.params;
    const { label, image, price } = req.body;

    const updatedOption = await OtherOption.findOneAndUpdate(
      { value },
      { label, image, price },
      { new: true }
    );

    if (!updatedOption) {
      return res.status(404).json({ message: 'Other option not found' });
    }

    res.json(updatedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteOtherOption = async (req, res) => {
  try {
    const { value } = req.params;
    const deletedOption = await OtherOption.findOneAndDelete({ value });

    if (!deletedOption) {
      return res.status(404).json({ message: 'Other option not found' });
    }

    res.json({ message: 'Other option deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
