const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const blogRoute = require('./controllers/blog')
const userRoute = require('./controllers/user')
const favoriteRoute = require('./controllers/favorite')
const session = require('express-session');
const passport = require('passport');
app.use(bodyParser.json())
app.use(cors())
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',blogRoute)
app.use('/user',userRoute)
app.use('/',favoriteRoute)
const PORT = 3000
app.listen((3000),()=>{
    console.log(`listem to the port http://localhost:${PORT}`)
})