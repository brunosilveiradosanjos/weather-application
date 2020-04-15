const request = require('request')

const forecast = (lat, lon, openWeatherKey, callback) => {
    let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + openWeatherKey + ''
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
        } else if (body.cod !== 200) {
            callback('Unable to connect to server', undefined)
            callback(body.message, undefined)
        } else {
            callback(undefined,
                'It\'s currently ' + body.main.temp + ' C degrees out, ' + body.weather[0].description + '. The wind is ' + body.wind.speed + ' m/s.'
                /*    {
                   temp: response.body.main.temp,
                   weather: response.body.weather[0].description,
                   wind: response.body.wind.speed
               } */
            )
        }
    })
}

module.exports = forecast


// request({ url: url, json: true }, (error, response) => {
//     console.log(url)
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.cod !== 200) {
//         console.log('error: ' + response.body.cod + ' message: ' + response.body.message)
//     } else {
//         console.log('it\'s currently ' + response.body.main.temp + ' degrees out.And it\'s ' + response.body.weather[0].description + ' in ' + response.body.name + '.')

//     }
// })