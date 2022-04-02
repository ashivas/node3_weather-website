const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = new express()
const port = process.env.PORT || 3000
// working dirs
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))


app.get('', (req, res)=>{
    res.render('index', {
        "Title": 'Local Weather',
        "Name": "Maniac",
        "Message": 'Use this app to get weather data'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        "Title": 'About',
        "Name": "Maniac"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        "Title": 'Help',
        "Name": "Maniac"
    })
})



app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"address is required in the params"
        })
    }
    const address = req.query.address
    geocode(address, (error, {longitude, latitude, location}={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            const weatherObj = {
                location,
                "forecast": forecastData.Message,
                "url":forecastData.Url,
                address
            }
            res.send(weatherObj)
        })
    })
})


app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must send a search term'
        })
    }

    const query = req.query.search
    res.send({
        "products": [query]
    })
})



app.get('/help/*', (req, res)=>{
    res.render('notfound', {
        "Message":'Help article not found',
        "Title": 'Help not found',
        "Name": "Maniac"
    })
})

app.get('*', (req, res)=>{
    res.render('notfound', {
        "Message":'Page not found',
        "Title": 'Not Found',
        "Name": "Maniac"
    })
})

app.listen(port, ()=>{
    console.log(`Server running at ${port} port`);
})