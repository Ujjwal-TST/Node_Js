const express = require('express');
require('./db/mongoose')
const userRoutes = require('./routes/User')
const taskRoutes = require('./routes/Task')


const app = express()
const port = process.env.PORT || 4000

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