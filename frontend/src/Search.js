import { useState } from 'react';
import './Search.css';

const Search = ({handleSearch}) => {

    const [formData, setFormData] = useState({
        searchTerm: ""
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }
    
    const submit = (e) => {
        e.preventDefault();
        handleSearch(formData.searchTerm.trim());
    };

    
    return(
        <form onSubmit={submit}>
            <input
            onChange={handleChange}
            type="text"
            placeholder="Search Here"
            name="searchTerm"
            id="search-term"
            />
            <button>Search</button>
        </form>
    )
}

export default Search;