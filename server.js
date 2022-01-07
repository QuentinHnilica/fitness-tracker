const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path =  require('path')
const routes = require('./routes/api')
const Workout = require('./models/Workout')

const PORT = process.env.PORT || 3001
const app = express()

app.use(morgan('dev'))
app.unsubscribe(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnesstrackerdb", 
{
    autoIndex: false,
    useNewUrlParser: true, 
    useFindAndModify: false
});
const db = mongoose.connection

db.on('error', error => console.log('DB Error', error))

app.use('/stats', express.static(path.join(__dirname, 'public/stats.html')))
app.use('/exercise', express.static(path.join(__dirname, 'public/exercise.html')))

app.use(routes)


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))