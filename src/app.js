const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars  engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jep Alorro'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jep Alorro'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Hi",
        name: 'Jep Alorro',
        title: 'Help Page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must include address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.rating)
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
       title: '404',
       name: 'Jep Alorro',
       errorMessage: 'Help page not found' 
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Jep Alorro'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})