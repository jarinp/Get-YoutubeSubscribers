const express = require('express')
const app = require('./app.js')
const mongoose = require('mongoose')
const port = process.env.PORT || 10000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// Connect to DATABASE
const DATABASEURL = "mongodb+srv://jerinr050:jerin@project.8d5tx.mongodb.net/?retryWrites=true&w=majority&appName=project";
mongoose.connect(DATABASEURL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
