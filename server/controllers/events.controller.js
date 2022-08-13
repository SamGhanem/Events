const Event= require('../models/events.models');

module.exports.findAllEvents = (req, res) => {
    Event.find()
        .then((allDaJEvents) => {
            res.json({events: allDaJEvents })
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in the find all', error: err })
        });
}

module.exports.findOneSingleEvents = (req, res) => {
Event.findOne({ _id: req.params.id })
        .then(oneSingleEvents => {
            res.json({events: oneSingleEvents })
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in the find one', error: err })
        });}

module.exports.createNewEvents = (req, res) => {
Event.create(req.body)
        .then(newlyCreatedEvents => {
            res.json({events: newlyCreatedEvents })
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in the create', error: err })
        });}

module.exports.updateExistingEvents = (req, res) => {
Event.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedEvents => {
            res.json({ events: updatedEvents })
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in the updating ', error: err })
        });}

module.exports.deleteAnExistingEvents = (req, res) => {
Event.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in the deleting ', error: err })
        });}
