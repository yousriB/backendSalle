const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback');

router.post('/create', feedbackController.createFeedback);
router.get('/all', feedbackController.getAllFeedback);
router.delete('/delete/:id', feedbackController.deleteFeedback);

module.exports = router;
