import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import UserContext from "./UserContext";

const Job = ({company, title, salary, equity, id}) => {
    const {hasAppliedToJob, apply} = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateApplication() {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]); 

    async function handleApply(e) {
        e.preventDefault();
        if(hasAppliedToJob(id)) return;
        apply(id);
        setApplied(true);
    }

    return(
        <div style={{width: '50%', margin: 'auto'}}>
            <h1>{company}</h1>
            <h3>{title}</h3>
            <button onClick={handleApply} disabled={applied}>{applied ? "Applied" : "Apply"}</button>
            <p>Salary: {salary}</p>
            <p>Equity: {equity}</p>
            <hr></hr>
        </div>
    )
}

export default Job;