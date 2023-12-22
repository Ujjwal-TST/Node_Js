const jwt = require('jsonwebtoken')
const User = require('../models/User')


// Middle Ware Function
const auth = async (req, res, next) => {
    // console.log('Auth middle ware');
    // console.log(req.authorization);
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const isTokenVerified = jwt.verify(token, 'thisisnodecourse')
        // console.log(isTokenVerified);
        const user = await User.findOne({ _id: isTokenVerified._id, 'tokens.token': token })
        // tokens.token:token check in the tokens array all token object whether that token value is exist or not


        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user

        next()

    }
    catch (e) {
        res.status(201).send({
            error: 'Invalid Login'
        })
    }
}

module.exports = auth