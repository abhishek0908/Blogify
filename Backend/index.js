const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const blogRoute = require('./controllers/blog')
const userRoute = require('./controllers/user')
const favoriteRoute = require('./controllers/favorite')
app.use(bodyParser.json())
app.use('/',blogRoute)
app.use('/user',userRoute)
app.use('/',favoriteRoute)
const PORT = 3000
app.listen((3000),()=>{
    console.log(`listem to the port http://localhost:${PORT}`)
})