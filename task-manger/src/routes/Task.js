const express = require('express');
const Task = require('../models/Task')
const auth = require('../middleware/auth');

const router = new express.Router()

// Task Endpoints

// Add
router.post('/tasks', auth, async (req, res) => {
    // res?.send('testing')
    // const task = new Task(req?.body)
    const task = new Task({
        ...req?.body,
        userId: req?.user?._id
    })

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
router.get('/tasks', auth, async (req, res) => {
    // res?.send('testing')

    // Using Promise

    // Task?.find({}).then((tasks) => {
    //     res?.send(tasks)
    // }).catch((err) => {
    //     res?.status(500).send(err)
    // })

    // Using async-await

    try {
        // 1st Way
        // const tasks = await Task.find({ userId: req?.user?._id })

        // 2nd Way
        await req?.user?.populate('tasks')
        // console.log(req.user);
        // console.log(tasks);
        res?.send(req?.user?.tasks)

    } catch (err) {
        // console.log(err);
        res?.status(500).send(err)
    }
})


// Get One 
router.get('/tasks/:id', auth, async (req, res) => {
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
        // const task = await Task?.findById(id)
        const task = await Task.findOne({ _id: id, userId: req.user._id })
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
router.patch('/tasks/:id', auth, async (req, res) => {

    const updatedFields = Object.keys(req.body)
    const validateFields = ['description', 'completed']

    const isValid = updatedFields.some((item) => validateFields.includes(item))

    if (!isValid) {
        return res?.status(400)?.send({
            error: 'Invalid Updates!!!'
        })
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req?.body, { new: true, runValidators: true })
        // const task = await Task.findByIdAndUpdate(req.params.id)
        const task = await Task.findOne({ _id: req?.params?.id, userId: req?.user?.id, })


        if (!task) {
            return res?.status(404).send({
                message: 'No task found'
            })
        }
        updatedFields.forEach(update => task[update] = req.body[update])
        await task.save()
        res?.send(task)
    } catch (err) {
        res?.status(500).send(err)
    }
})

// Delete 
router.delete('/tasks/:id', auth, async (req, res) => {


    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req?.user?.id })

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