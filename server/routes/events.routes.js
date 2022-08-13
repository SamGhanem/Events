const EventsController = require('../controllers/events.controller');

module.exports = app => {
    app.get('/api/events', EventsController.findAllEvents);
    app.get('/api/events/:id', EventsController.findOneSingleEvents);
    app.put('/api/events/:id', EventsController.updateExistingEvents);
    app.post('/api/events/create', EventsController.createNewEvents);
    app.delete('/api/events/:id', EventsController.deleteAnExistingEvents);
}