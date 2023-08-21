const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]

if (!location) {
    console.log('Please Provide an Location');
}
else {
    geocode(location, (error, data) => {
        // console.log(error);
        if (error) {
            return console.log(error);
        }
        forecast(data?.latitude, data?.longitude, (error, forecastData) => {
            if (error) {

                return console.log(error);

            }

            console.log(data?.location);
            console.log(forecastData);

        })
    })
}