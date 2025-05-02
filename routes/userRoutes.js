const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getCurrentUser);
router.put("/update/:id", userController.updateUser);
// router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
