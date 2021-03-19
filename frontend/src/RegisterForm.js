import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom';
import JoblyApi from './api';

const RegisterForm = ({register}) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    const submit = async(e) => {
        e.preventDefault();
        let res = await register(formData);
        if(res.success) {
            history.push('/companies');
        } else {
            history.push('/');
        }
        // const token = await JoblyApi.register(formData);
        // localStorage.setItem('token', token);
    }

    return(
        <div>
            <form onSubmit={submit}>

                <input
                onChange={handleChange}
                type="text"
                name="username"
                id="username"
                value={formData.username}
                placeholder="Username"
                />
                
                <input
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="Password"
                />

                <input
                onChange={handleChange}
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                placeholder="First Name"
                />

                <input
                onChange={handleChange}
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                />

                <input
                onChange={handleChange}
                type="text"
                name="email"
                id="email"
                value={formData.email}
                placeholder="Email Address"
                />

                <button>Submit</button>

            </form>
        </div>
    )
}

export default RegisterForm;