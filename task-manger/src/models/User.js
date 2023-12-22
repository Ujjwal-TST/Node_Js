const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Task = require('./Task')

// We use the schema because we want to use the middleware for validating the fields before and after save


const userSchema = new mongoose.Schema({

    // we do the validation
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    // A field which is stored in the data base and in userId is the relationship between user model and taks model
    foreignField: 'userId',
    //foreignField is a  field name which is assoicate with the other model
    // Here we define that task model which connect the user model and we connect it with the userId

})
// Virtual is use for createing the dynamic attribute for the schema and create the realations ship for other models



// Instance Method
// we use the instance method when we want to apply that method in evrery instance of model not into the whole schema
userSchema.methods.generateAuthToken = async function () {
    const user = this

    // console.log(user);

    // const token = jwt.sign({ _id: user._id.toString() }, 'thisisnodecourse',{expiresIn:'2 days'});
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisnodecourse');
    user.tokens = user.tokens.concat({ token })

    // console.log(user);
    await user.save()
    // await user.save()

    return token


};
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// Static Functions are use for to define custom methods for scheema and applied it to the whole scheema
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    // console.log(!user);

    if (!user) {
        throw new Error('Unable to login')
    }

    // To match the password is correct as per email
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Middleware

// is used to customize the behaviour of mongoose model
// only use if we define our schema
// we can use middleware to pass some function before of after some events occur
// events like validate,save,remove etc...
// Before save we use .pre('action name',callback using function keyword) method
// After save we use .post('action name',callback using function keyword) method


userSchema.pre('save'
    , async function (next) {
        const user = this

        // console.log('just beofre save');
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8)
        }

        next()
        // next we use for to end the function if we don't use next so the function is hang there and not ending
    })

userSchema.pre('findOneAndDelete', async function (next) {
    const user = this;

    // Delete associated tasks before removing the user
    await Task.deleteMany({ userId: user._id });

    console.log('Just before delete');

    // Call next to proceed with the remove action
    next();
});




// User Model
const User = mongoose.model('User', userSchema)

// .model is also apply the propery of schema insted of passing an object as an arguments

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