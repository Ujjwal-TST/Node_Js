const express = require('express');
require('./db/mongoose')
const User = require('./models/User')

const app = express()
const port = process.env.PORT || 3000

// Use to Parse Incoming Json to an Object
app.use(express.json())


app.post('/users', (req, res) => {
    console.log(req.body);
    const user = new User(req.body)

    user.save().then(() => {
        // res.status(201)
        // res.send(user)
        res.status(201).send(user)
        // Above code short form
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})