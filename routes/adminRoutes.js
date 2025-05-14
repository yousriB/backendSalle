const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Food Options
router.get('/food-options', adminController.getFoodOptions);
router.post('/food-options', adminController.addFoodOption);
router.put('/food-options/:value', adminController.updateFoodOption);
router.delete('/food-options/:value', adminController.deleteFoodOption);

// Location Options
router.get('/location-options', adminController.getLocationOptions);
router.post('/location-options', adminController.addLocationOption);
router.put('/location-options/:value', adminController.updateLocationOption);
router.delete('/location-options/:value', adminController.deleteLocationOption);

// Decoration Options
router.get('/decoration-options', adminController.getDecorationOptions);
router.post('/decoration-options', adminController.addDecorationOption);
router.put('/decoration-options/:value', adminController.updateDecorationOption);
router.delete('/decoration-options/:value', adminController.deleteDecorationOption);

// Entertainment Options
router.get('/entertainment-options', adminController.getEntertainmentOptions);
router.post('/entertainment-options', adminController.addEntertainmentOption);
router.put('/entertainment-options/:value', adminController.updateEntertainmentOption);
router.delete('/entertainment-options/:value', adminController.deleteEntertainmentOption);

// Other Options
router.get('/other-options', adminController.getOtherOptions);
router.post('/other-options', adminController.addOtherOption);
router.put('/other-options/:value', adminController.updateOtherOption);
router.delete('/other-options/:value', adminController.deleteOtherOption);

module.exports = router;