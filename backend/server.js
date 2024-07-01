require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const jobRoutes = require('./routes/jobs')

// Express app
const app = express()

// Middleare
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/jobs', jobRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      // Listen for requests
      app.listen(process.env.PORT, () => {
      console.log('Connected to db & Listening on port', process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })



process.env