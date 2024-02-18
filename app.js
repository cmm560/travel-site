const express = require('express')

const expressHandlebars = require('express-handlebars')

const app = express()



// static files or folders are specified before any route
app.use(express.static(__dirname + "/public"))


//configure our express app to use handlebars
app.engine('handlebars',expressHandlebars.engine({
    defaultlayout: 'main',
}))



app.set('view engine','handlebars')
//ends handlebar configuration


const port = process.env.port || 3000

const gallery = require('./data/gallery.json')
//routes go before 404 and 500
app.get('/',(req,res) => {
    var data = require('./data/home-data.json')
    res.render('page',{ data, gallery })
})

app.get('/life',(req,res)=>{
    var data = require('./data/life-data.json')
    res.render('page',{ data, gallery })
})

app.get('/nightlife',(req,res)=>{
    var data = require('./data/nightlife-data.json')
    res.render('page', { data, gallery })
})

app.get('/food',(req,res)=>{
    var data = require('./data/food-data.json')
    res.render('page', { data, gallery })
})

app.get('/umbrella',(req,res)=>{
    var data = require('./data/umbrella-data.json')
    res.render('page', { data, gallery })
})


//Error handling -> app.use() basic express route
app.use((req,res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - not found')
})

//Server Error 500
app.use( (error,req,res,next) => {
    console.error(error.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - server error')
})



app.listen(port,()=>{
    console.log('Server started http:??localhost:${port}')
    console.log('Server starter http://localhost:'+port)
    console.log('To close pres ctrl + c')
})
