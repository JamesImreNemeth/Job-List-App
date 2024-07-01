const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    repeats: {
        type: Number
    }
}, { timestamps: true })

module.exports = mongoose.model('JobList', jobSchema)