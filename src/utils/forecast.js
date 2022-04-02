const request = require('request')

const forecast = ( longitude,latitude, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=1d08a78ed60bdc595b664ee14b6df4eb&query="+latitude+","+longitude+"&units=f"
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather app!", undefined);
        } else if (response.body.error) {
            callback("Unable to query, please check the query params and try later", undefined)
        } else {
            const data = response.body
            const weatherObj = {
                Url: data.current.weather_icons,
                Message:`Weather forecast is ${data.current.weather_descriptions}. The current temperature is  ${data.current.temperature}  and it feels like ${data.current.feelslike}. The current humidity is 
                ${data.current.humidity}%.`
            }
            callback(undefined, weatherObj )
        }
    }) 
}

module.exports = forecast;