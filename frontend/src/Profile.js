import {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from './UserContext';
import JoblyApi from './api';

const Profile = () => {
    const {currUser, setCurrUser} = useContext(UserContext);
    const history = useHistory();

    let INITIAL_STATE = {
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email
    };

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const submit = async(e) => {
        e.preventDefault();
        const u = await JoblyApi.editUser(currUser.username, formData);
        setFormData({
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email            
        });
        setCurrUser(u);
        history.push('/');
    };

    return(
        <form onSubmit={submit}>

            {/* <input
            type="text"
            name="username"
            value={formData.username}
            id="username"
            placeholder="Username"
            onChange={handleChange}
            /> */}

            <input
            type="text"
            name="firstName"
            value={formData.firstName}
            id="firstName"
            placeholder="First Name"
            onChange={handleChange}
            />

            <input
            type="text"
            name="lastName"
            value={formData.lastName}
            id="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            />

            <input
            type="text"
            name="email"
            value={formData.email}
            id="email"
            placeholder="Email"
            onChange={handleChange}
            />            

            <button>Submit</button>            

        </form>
    )
}

export default Profile;


    // useEffect(() => {
    //     async function getUser() {
    //         INITIAL_STATE = {
    //             firstName: currUser.firstName,
    //             lastName: currUser.lastName,
    //             email: currUser.email
    //         }
    //         setFormData(INITIAL_STATE);
    //         setIsLoading(false);
    //     }
    //     setIsLoading(true);
    //     getUser();
    // }, []);
