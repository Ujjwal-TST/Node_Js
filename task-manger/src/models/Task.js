const mongoose = require('mongoose');
const validator = require('validator');

// Task Model
const taskSchema = new mongoose.Schema({
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
}, {
    timestamps: true
})
const Task = mongoose.model('Task', taskSchema)

module.exports = Task