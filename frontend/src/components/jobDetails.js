import { useJobsContext } from '../hooks/useJobsContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const JobDetails = ({ job }) => {
    const { dispatch } = useJobsContext();

    const handleClick = async () => {
        const response = await fetch('/api/jobs/' + job._id, {
            method: 'DELETE'
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({type: 'DELETE_JOB', payload: json});
        }
    };

    return (
        <div className="job-details">
            <h4>{job.title}</h4>
            <p><strong>Info: </strong>{job.info}</p>
            <p><strong>Priority: </strong>{job.priority}</p>
            <p><strong>Repeat: </strong>{job.repeats}</p>
            <p>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    );
};

export default JobDetails;
