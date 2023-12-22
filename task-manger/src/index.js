const express = require('express');
require('./db/mongoose')
const userRoutes = require('./routes/User')
const taskRoutes = require('./routes/Task')


const app = express()
const port = process.env.PORT || 4000


// -----------> Express Middleware <-----------
// alwasy define it First

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('Get Method is Not Available')
//     }
//     else {
//         next()
//     }

//     // Above function is stope execution when we hit the GET api methods
//     // but for rest methods type it execute, that's why we use the next() to execute it
// })

// Express Middleware
// For Maintance of Backend

// app.use((req, res, next) => {
//     res.status(503).send('Under Maintance!!!')
// })

// Use to Parse Incoming Json to an Object
app.use(express.json())


// User Endpoints
// All endpoints move into the routes User.js file
// use the routes enpoint first import it
// use app.use() method
app.use(userRoutes)

// Task Route
app.use(taskRoutes)


app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

const Task = require('./models/Task')
const User = require('./models/User')

const main = async () => {
    // const task = await Task.findById('65852f1715c7f51265cae046')
    // await task.populate('userId')
    // Populate() method give the no of  user which is associate with the given task

    // console.log(task);

    const user = await User.findById('65853426593467611d1957d0');
    await user.populate('tasks')
    // here we found the no of task which is associate with the given user
    // console.log(user.tasks);
}

// main()