require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/router.js')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/', routes)

mongoose.connect(process.env.MONGO_URI)
.then(
  app.listen(3000,() =>{
    console.log(`connected to db & server is running on ${process.env.PORT}`)
  })
)