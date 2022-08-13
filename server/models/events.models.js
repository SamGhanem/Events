const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
    start:{
        type: Date,
        required: [true, "Start Date is required!!!!"],
    },
    end:{
        type: Date,
        required: [true, "End Date is required!!!!"],
    },
    title: {
        type: String,
        required: [true, "Title is required!!!!"],
        minlength: [3, "Title must be 3 Characters"],
    },
    place: {
        type: String,
    },



}, {timestamps: true} );

const Events = mongoose.model('events', EventsSchema);

module.exports = Events;
