const jobDetails = ({ job }) => {
    return (
        <div className="job-details">
            <h4>{job.title}</h4>
            <p><strong>Info: </strong>{job.info}</p>
            <p><strong>Priority: </strong>{job.priority}</p>
            <p><strong>Repeat: </strong>{job.repeats}</p>
            <p>{job.createdAt}</p>
        </div>
    )
}

export default jobDetails