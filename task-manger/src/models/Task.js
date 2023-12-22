const mongoose = require('mongoose');
const validator = require('validator');

// Task Model
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        // type is the object id
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        // Ref is use to define refrence between 2 models relationshiop
    },
})

module.exports = Task