const express = require('express');
const Task = require('../models/Task')

const router = new express.Router()

// Task Endpoints

// Add
router.post('/tasks', async (req, res) => {
    // res?.send('testing')
    console.log(req?.body);
    const task = new Task(req?.body)

    // Using Promise

    // task.save().then(() => {
    //     res?.status(201).send(task)
    // }).catch((err) => {
    //     res?.status(400).send(err)
    // })

    // Using async-await

    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

// Get All
router.get('/tasks', async (req, res) => {
    // res?.send('testing')

    // Using Promise

    // Task?.find({}).then((tasks) => {
    //     res?.send(tasks)
    // }).catch((err) => {
    //     res?.status(500).send(err)
    // })

    // Using async-await

    try {
        const tasks = await Task.find({})
        res?.send(tasks)

    } catch (err) {
        res?.status(500).send(err)
    }
})


// Get One 
router.get('/tasks/:id', async (req, res) => {
    // console.log(req?.params);
    const id = req?.params?.id

    // Using Promise

    // Task?.findById(id).then((task) => {
    //     if (!task) {
    //         return res?.status(404)?.send({
    //             message: 'No Task Found!!!'
    //         })
    //     }
    //     res?.send(task)
    // }).catch((err) => {
    //     res?.status(500).send(err)
    // })

    // Using async-await

    try {
        const task = await Task?.findById(id)
        if (!task) {
            return res?.status(404)?.send({
                message: 'No Task Found!!!'
            })
        }
        res?.send(task)
    } catch (err) {
        res?.status(500).send(err)
    }
})

// Update 
router.patch('/tasks/:id', async (req, res) => {

    const updatedFields = Object.keys(req.body)
    const validateFields = ['description', 'completed']

    const isValid = updatedFields.some((item) => validateFields.includes(item))

    if (!isValid) {
        return res?.status(400)?.send({
            error: 'Invalid Updates!!!'
        })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req?.body, { new: true, runValidators: true })

        if (!task) {
            return res?.status(404).send({
                message: 'No task found'
            })
        }

        res?.send(task)
    } catch (err) {
        res?.status(500).send(err)
    }
})

// Delete 
router.delete('/tasks/:id', async (req, res) => {


    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res?.status(404).send({
                message: 'No task found'
            })
        }

        res?.send({
            message: 'Task Deleted Successfully!!!'
        })
    } catch (err) {
        res?.status(500).send(err)
    }
})

module.exports = router