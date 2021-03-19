import Search from './Search';
import CompanyCard from './CompanyCard';
import { useEffect, useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import JoblyApi from './api';
import UserContext from './UserContext'

const CompanyList = () => {
    const history = useHistory();
    const user = useContext(UserContext);

    if(!user.currUser) {
        history.push('/');
    }

    const [companies, setCompanies] = useState();

    useEffect(() => {
        async function getAllCompanies() {
            let comRes = await JoblyApi.getAllCompanies();
            setCompanies(comRes);
        }
        getAllCompanies();
    }, []);

    async function search(formData) {
        const searchRes = await JoblyApi.getCompanies(formData);
        setCompanies(searchRes);
    } 
    return(
        <div>
            <Search handleSearch={search}/>
            {companies ? companies.map(c => (
                <CompanyCard name={c.name} description={c.description} logo={c.logoUrl} handle={c.handle}/> 
            )) : "Loading"}

        </div>
    )
}

export default CompanyList;