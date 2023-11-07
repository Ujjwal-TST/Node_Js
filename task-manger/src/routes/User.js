const express = require('express');
const User = require('../models/User')

const router = new express.Router()

// Add
router.post('/users', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body)

    // Using Promise

    // user.save().then(() => {
    //     // res.status(201)
    //     // res.send(user)
    //     res.status(201).send(user)
    //     // Above code short form
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })

    // Using async-await

    try {
        await user.save()
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

// Get All
router.get('/users', async (req, res) => {
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

// Get One 
router.get('/users/:id', async (req, res) => {
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

// Update One
router.patch('/users/:id', async (req, res) => {

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
        const user = await User.findByIdAndUpdate(req.params.id, req?.body, { new: true, runValidators: true })

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

// Delete 
router.delete('/users/:id', async (req, res) => {




    try {
        const user = await User.findByIdAndDelete(req.params.id)

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