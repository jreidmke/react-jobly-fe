import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import JoblyApi from './api';
import Job from './Job'

const CompanyDetails = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState();
    const [imgSrc, setImgSrc] = useState();

    useEffect(() => {
        async function getCompany() {
            const c = await JoblyApi.getCompany(handle);
            setCompany(c);
            console.log(c);
            if(c.logoUrl) {
                setImgSrc(`.${c.logoUrl}`);
            } else {
                setImgSrc("https://www.brandcrowd.com/gallery/brands/pictures/picture15635752108148.jpg");
            }
        }
        getCompany();
    }, [handle])

    function companyRender(c) {
        return(
        <div style={{width: '50%', margin: 'auto'}}>
            <span style={{display:'inline'}}>
                <h1><img src={imgSrc} alt='company-logo' id='company-logo'/><Link to={`/companies/${c.handle}`}>{c.name}</Link></h1>
            </span>
            <h3>{c.description}</h3>
            <hr></hr>
            {c.jobs.map(j => (
                <Job company={j.company} title={j.title} salary={j.salary} equity={j.equity} id={j.id}/>
            ))}
        </div>
        )
    }

    return(
        <div>
            {company ? companyRender(company) : 'Loading'}
        </div>
    )
}

export default CompanyDetails;