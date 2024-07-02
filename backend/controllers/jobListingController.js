const jobListModel = require('../models/jobListModel')
const mongoose = require('mongoose')

// Get all Job Listings
const getJobs = async (req, res) => {
    const jobs = await jobListModel.find({}).sort({createdAt: -1})

    res.status(200).json(jobs)
}

// Get single Job Listing
const getJob = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Job Found'})
    }

    const job = await jobListModel.findById(id)

    if(!job) {
        return res.status(404).json({error: 'No Job Listing Found.'})
    }

    res.status(200).json(job)
}

// Create a new Job Listing
const createJob = async (req, res) => {
    const {title, info, priority, repeats} = req.body
    
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!info) {
        emptyFields.push('info')
    }
    if (!priority) {
        emptyFields.push('priority')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields required', emptyFields })
    }

    // Add doc to DB
    try {
        const jobList = await jobListModel.create({title, info, priority, repeats})
        res.status(200).json(jobList)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// Delete a Job Listing
const deleteJob = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Job Found'})
    }
    
    const job = await jobListModel.findOneAndDelete({_id: id})

    if(!job) {
        return res.status(400).json({error: 'No Job Listing Found.'})
    }

    res.status(200).json(job)


}

// Update a Job Listing
const updateJob = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Job Found'})
    }

    const job = await jobListModel.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!job) {
        return res.status(400).json({error: 'No Job Listing Found.'})
    }

    res.status(200).json(job)

}

module.exports = {
    getJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}