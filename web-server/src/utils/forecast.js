const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=c235af0a9edfc6b664d5d772f04d0ce8&query=${latitude},${longitude}`

    request({ url, json: true }, (error, res) => {

        if (error) {
            callback('Unable to connect to weather stack service!!!', undefined);
        }
        else if (res?.body?.error) {
            callback('Unable to find a location!!!', undefined);
        }
        else {

            const weatherData = res.body.current
            // console.log(`${weatherData?.weather_descriptions[0]}. It is currentyly ${weatherData?.temperature} degrees out. It feels like ${weatherData?.feelslike} degrees out`);
            callback(undefined, `${weatherData?.weather_descriptions[0]}. It is currentyly ${weatherData?.temperature} degrees out. It feels like ${weatherData?.feelslike} degrees out`)


        }

    })

}
module.exports = forecast