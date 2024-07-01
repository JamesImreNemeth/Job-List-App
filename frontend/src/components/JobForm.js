import { useState } from "react"

const JobForm = () => {
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState('')
    const [priority, setPriority] = useState('')
    const [repeat, setRepeat] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const job = {title, info, priority, repeat}

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
            setRepeat('')
            setError(null)
            console.log('New Job Added', json)
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
                onChange={(e) => setRepeat(e.target.value)}
                value={repeat}
            />
            <button>Add Job</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default JobForm