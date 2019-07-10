const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/fd85f0ba7c4f2b3c96a9a7567eea3bfa/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request( {url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Try a different coordinates', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast