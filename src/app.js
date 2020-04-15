const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// const key = require('../../../my_key')
const dotenv = require('dotenv');
dotenv.config();

const app = express()
const port = process.env.PORT || 3000
const MapBoxKey = process.env.MAPBOXKEY
const OpenWeatherKey = process.env.OPENWEATHERKEY

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hanflebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup stattic directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bruno Anjos'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Giovana Anjos'
    })
})

// help.hbl file is rendered
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sarah Anjos'
    })
})

// No weather file, send object to page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address needs to be provided!'
        })
    }
    geocode(req.query.address, MapBoxKey, (error, { lat, lon, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, lon, OpenWeatherKey, (error, { temp, weather, wind, humidity }) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                temp,
                weather,
                wind,
                humidity,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bruno Anjos',
        errorMessage: 'Help article not found'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bruno Anjos',
        errorMessage: 'About article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bruno Anjos',
        errorMessage: ' Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})