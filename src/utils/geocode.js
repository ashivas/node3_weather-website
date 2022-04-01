const request = require('request')



const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2hpdmhhcmUyMDA5bW9udSIsImEiOiJjbDBzdG5mb2YwZ3Y3M2NueDZudzlnNHNrIn0.qNxzV8U8ZEglIqSsvtJeIA"
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services", undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find, please try correct location", undefined)
        } else {
            const data = response.body
            const longitude = data.features[0].center[0];
            const latitude = data.features[0].center[1];
            const location = data.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode;