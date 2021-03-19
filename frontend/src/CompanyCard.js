import './CompanyCard.css'
import { Link } from 'react-router-dom';

const CompanyCard = ({name, description, logo, handle}) => {
    const imgSrc = "https://www.brandcrowd.com/gallery/brands/pictures/picture15635752108148.jpg" 
    return(
        <div style={{width: '50%', margin: 'auto'}}>
            <span style={{display:'inline'}}>
                <h1><img src={imgSrc} alt='company-logo' id='company-logo'/><Link to={`/companies/${handle}`}>{name}</Link></h1>
            </span>
            <h3>{description}</h3>
            <hr></hr>
        </div>
    )
}

export default CompanyCard;