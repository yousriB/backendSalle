const Feedback = require('../models/Feedback');

exports.createFeedback = (req, res) => {
    const feedback = new Feedback(req.body);
    feedback.save()
        .then(() => res.status(201).json({ message: 'Feedback created successfully' }))
        .catch(err => res.status(500).json({ error: err }));
};

exports.getAllFeedback = (req, res) => {
    Feedback.find()
        .then(feedbacks => res.status(200).json(feedbacks))
        .catch(err => res.status(500).json({ error: err }));
};

exports.deleteFeedback = (req, res) => {
    Feedback.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Feedback deleted successfully' }))
        .catch(err => res.status(500).json({ error: err }));
};
