import Job from './Job';
import { useEffect, useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';import JoblyApi from './api';
import Search from './Search';
import UserContext from './UserContext';

const JobList = () => {
    const history = useHistory();
    const {currUser} = useContext(UserContext);
    
    if(!currUser) {
        history.push('/');
    }

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function getJobs() {
            const jobs = await JoblyApi.getAllJobs();
            setJobs(jobs);
        }
        getJobs();
    }, []);

    async function search(formData) {
        const searchRes = await JoblyApi.getJobs(formData);
        setJobs(searchRes);
    }

    return(
        <div>
            <Search handleSearch={search}/>
            {jobs ? jobs.map(j => (
                <Job company={j.companyName} title={j.title} salary={j.salary} equity={j.equity} id={j.id}/>
            )) : "Loading..."}
        </div>
    )
}

export default JobList;