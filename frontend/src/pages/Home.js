import { useEffect, useState } from "react"

// Componenets
import JobDetails from '../components/jobDetails'
import JobForm from '../components/JobForm'


const Home = () => {
    const [jobs, setJobs] = useState(null)

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch('/api/jobs')
            const json = await response.json()

            if (response.ok) {
                setJobs(json)
            }
        }

        fetchJobs()
    }, [])

    return (
        <div className="home">
            <div className="jobs">
                {jobs && jobs.map((job) => (
                    <JobDetails key={job._id} job={job}/>
                ))}
            </div>
            <JobForm />
        </div>

    )
}

export default Home