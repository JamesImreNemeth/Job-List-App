const express = require('express')
const {
    createJob,
    getJobs,
    getJob,
    deleteJob,
    updateJob
} = require('../controllers/jobListingController')

const router = express.Router()

// Get all jobs listed
router.get('/', getJobs)

// Get a single job listed
router.get('/:id', getJob)

// Create a new Job Listing
router.post('/', createJob)

// Delete a Job
router.delete('/:id', deleteJob)

// Update a job listing
router.patch('/:id', updateJob)

module.exports = router