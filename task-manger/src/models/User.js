const mongoose = require('mongoose');
const validator = require('validator');

// User Model
const User = mongoose.model('User', {

    // we do the validation
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Email is Invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [7, 'length must be greater than 6'],
        trim: true,
        validate(val) {
            if (val.toLowerCase().includes('password')) {
                throw new Error("You can't set the password as password")
            }
        }
    },

    age: {
        type: Number,
        default: 18,
        validate(val) {
            if (val < 0) {
                throw new Error("Age must be Positive Number!!!")
            }
        }
    }
})

// Createing the object of User Model
// const user1 = new User({
//     name: 'Test 3',
//     email: 'Test3@gmail.com',
//     password: 'test@123'
// })


// // // .save() is used to save the data in the data base
// user1.save().then(() => {
//     console.log(user1);
// }).catch((err) => {
//     console.log('Error', err);
// })

module.exports = User