import { JobsContext } from "../context/JobContext";
import { useContext } from "react";

export const useJobsContext = () => {
    const context = useContext(JobsContext)

    if (!context) {
        throw Error('useJobContext must be used inside an JobsContextProvider')
    }

    return context
}