const express = require('express');
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = new express.Router()

// Login
router.post('/users/login', async (req, res) => {

    // We can only use custom Methods if define our own schema in User model instead of passing obj
    // here findByCredentials() is our custom schema method
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // we want to genrate token for particular use
        // console.log(req.body);
        res.send({ user: user, token })
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})

// Logout

// Here auth is middleware use for the authentication
// Syntax: router.your_method('endpoint',middleware,callback function)
router.post('/users/logout', auth, async (req, res) => {
    f

    // console.log(req.user);
    // res.send(req.user)
    req.user.tokens = req.user.tokens.filter(item => item.token !== req.token)
    // console.log(req.user);
    await req.user.save()

    res.send({
        message: 'Logout Successfully!!!'
    })
    try {

    } catch (error) {
        res.status(500).send()
    }



})
// Logout All
router.post('/users/logoutAll', auth, async (req, res) => {

    // console.log(req.user);
    // res.send(req.user)
    req.user.tokens = []

    await req.user.save()

    res.send({
        message: 'Logout from All Devices Successfully!!!'
    })
    try {

    } catch (error) {
        res.status(500).send
    }



})

// Add of Signup
router.post('/users', async (req, res) => {
    // console.log(req.body);
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken()
        // await user.save()
        res.status(201).send({ user, token })
    } catch (err) {
        // console.log(err);
        res.status(400).send(err)
    }
})

// // Get All
router.get('/users', auth, async (req, res) => {
    // console.log(req?.body);

    // Using Promise

    // User?.find({}).then((users) => {
    //     res?.send(users)
    // }).catch((err) => {
    //     res?.status(500).send(err)
    // })

    // Using async-await

    try {
        const users = await User.find({})
        res?.send(users)

    } catch (err) {
        res?.status(500).send(err)
    }




})


// Get Me
// auth is a express middleware
router.get('/users/me', auth, async (req, res) => {

    // console.log(req.user);
    res.send(req.user)



})

// Get One 
router.get('/users/:id', auth, async (req, res) => {
    // console.log(req?.params);
    const id = req?.params?.id

    // Using Promise
    // User?.findById(id).then((user) => {
    //     if (!user) {
    //         return res?.status(404)?.send({
    //             message: 'No User Found!!!'
    //         })
    //     }
    //     res?.send(user)
    // }).catch((err) => {
    //     res?.status(500).send(err)
    // })

    try {
        const user = await User?.findById(id)
        if (!user) {
            return res?.status(404)?.send({
                message: 'No User Found!!!'
            })
        }
        res?.send(user)
    } catch (err) {
        res?.status(500).send(err)
    }
})

// Update Me
router.patch('/users/me', auth, async (req, res) => {

    const updatedFields = Object.keys(req.body)
    const valiateFields = ['name', 'age', 'email', 'password']

    const isValid = updatedFields.every((item) => valiateFields.includes(item))

    // console.log(isValid);

    if (!isValid) {
        return res?.status(400)?.send({
            message: 'Invalid Updates!!!'
        })
    }

    try {
        // const user = await req?.user.updateOne()
        // console.log(user, 'Herere');
        updatedFields.forEach(update => req.user[update] = req.body[update])
        await req.user.save()

        res?.send(req.user)

    } catch (err) {
        console.log(err);
        res?.status(500).send(err)
    }
})
// Update One
router.patch('/users/:id', auth, async (req, res) => {

    const updatedFields = Object.keys(req.body)
    const valiateFields = ['name', 'age', 'email', 'password']

    const isValid = updatedFields.every((item) => valiateFields.includes(item))

    // console.log(isValid);

    if (!isValid) {
        return res?.status(400)?.send({
            message: 'Invalid Updates!!!'
        })
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req?.body, { new: true, runValidators: true })
        // we can not use this code if we want to use middleWare 

        const user = await User.findByIdAndUpdate(req.params.id)
        updatedFields.forEach(update => user[update] = req.body[update])
        await user.save()

        // we need to use this 3 line code for that

        if (!user) {
            return res?.status(404)?.send({
                message: 'No User Found!!!'
            })
        }
        res?.send(user)

    } catch (err) {
        res?.status(500).send(err)
    }
})

// Delete  me
router.delete('/users/me', auth, async (req, res) => {
    // console.log(req.user);
    try {

        // Delete you account 
        await await User.findOneAndDelete(req.user._id)
        // deleteOne() is the mongoose function
        res?.send(req.user)


    } catch (err) {
        console.log(err);
        res?.status(500).send(err)
    }
})
// Delete 
router.delete('/users/:id', auth, async (req, res) => {

    try {
        const user = await User.findOneAndDelete(req?.params.id)

        if (!user) {
            return res?.status(404)?.send({
                message: 'No User Found!!!'
            })
        }
        res?.send({
            message: 'User Deleted Successfully!!!'
        })

    } catch (err) {
        res?.status(500).send(err)
    }
})

module.exports = router