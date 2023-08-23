const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();

// Define path for Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Static file path
app.use(express.static(publicDirectoryPath))


// Home Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ujjwal Patel',
    })
})

// Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ujjwal Patel ',
    })
})
// About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ujjwal Patel',
    })
})

//  Page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term'
        })
    }
    console.log(req.query.address);
    geocode(req.query.address, (error, data) => {
        // console.log(error);
        if (error) {
            return res.send({ error });
        }
        forecast(data?.latitude, data?.longitude, (error, forecastData) => {
            if (error) {

                return res.send({ error });

            }

            // console.log(data?.location);
            // console.log(forecastData);
            res.send({
                forecastData,
                location: data?.location,
                address: req?.query?.address
            })

        })
    })

})

// Help Page error page
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 error',
        error: 'Help article is Not found',
        name: 'Ujjwal Patel',
    })
})
// 404 error page
app.get('*', (req, res) => {
    res.render('error', {
        title: '404 error',
        error: 'Page is Not found',
        name: 'Ujjwal Patel',
    })
})


app.listen(3003, () => {
    console.log('Server running on the port 3003');
})