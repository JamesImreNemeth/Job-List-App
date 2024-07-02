import { useState } from "react"
import { useJobsContext } from "../hooks/useJobsContext"

const JobForm = () => {
    const { dispatch } = useJobsContext()

    const [title, setTitle] = useState('')
    const [info, setInfo] = useState('')
    const [priority, setPriority] = useState('')
    const [repeats, setRepeats] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const job = {title, info, priority, repeats}

        const response = await fetch('/api/jobs', {
            method: 'POST',
            body: JSON.stringify(job),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setInfo('')
            setPriority('')
            setRepeats('')
            setError(null)
            dispatch({type: 'CREATE_JOB', payload: json})
        }
    } 

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Job</h3>

            <label>Job Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Job Information:</label>
            <input
                type="text"
                onChange={(e) => setInfo(e.target.value)}
                value={info}
            />
            <label>Job Priority:</label>
            <input
                type="text"
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
            />
            <label>Repeat: (Not necessary)</label>
            <input
                type="number"
                onChange={(e) => setRepeats(e.target.value)}
                value={repeats}
            />
            <button>Add Job</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default JobForm