const request = require('request');

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidWpqd2FsLTA4IiwiYSI6ImNsbGtrNG93YjE0cTUzcHF1NDd6M2xyNGkifQ._5EO5AGNms4NOs7V4E-lHw&limit=1`

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to map box service!!!', undefined);
        }
        else if (res?.body?.features.length === 0) {
            callback('Unable to find a location!!!', undefined);
        }
        else {
            const geocodeData = res?.body;

            callback(undefined, {
                longitude: geocodeData?.features[0]?.center[0],
                latitude: geocodeData?.features[0]?.center[1],
                location: geocodeData?.features[0]?.place_name
            })
        }
    })
}

module.exports = geocode