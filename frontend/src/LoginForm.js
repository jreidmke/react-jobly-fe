import {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';

const LoginForm = ({ login }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    const submit = async(e) => {
        e.preventDefault();
        let res = await login(formData);
        if(res.success) {
            history.push('/companies');
        } else {
            history.push('/');
        }
    }

    return(
        <div>
            <form onSubmit={submit}>
                <input
                onChange={handleChange}
                type="text"
                name="username"
                value={formData.username}
                id="username"
                placeholder="Username"
                />
                
                <input
                onChange={handleChange}
                type="password"
                name="password"
                value={formData.password}
                id="password"
                placeholder="Password"
                />

                <br></br>
                <button>Submit</button>
            </form>
            <h1><Link to='/register'>New to Jobly? Click here to register!</Link></h1>

        </div>
    )
}

export default LoginForm;