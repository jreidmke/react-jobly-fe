import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import UserContext from './UserContext'

const NavBar = ({logout}) => {
    let {currUser} = useContext(UserContext);

    function loggedInNav() {
        return(
            <div id='nav-bar'>
                <Link id='logo' to="/">Jobly</Link>
                <Link id='link' to='/companies'>Companies</Link>
                <Link id='link' to='/jobs'>Jobs</Link>
                <Link id='link' to='/' onClick={logout}>Logout {currUser.firstName}</Link>
                <Link id='link' to='/profile'>Profile</Link>
            </div>            
        )
    }

    function loggedOutNav() {
        return(
            <div id='nav-bar'>
                <Link id='logo' to="/">Jobly</Link>
                <Link id='link' to='/login'>Login</Link>
                <Link id='link' to='/register'>Register</Link>
            </div>
        )
    }

    return(
        <div>
            {currUser ? loggedInNav() : loggedOutNav()}
        </div>
    )
}

export default NavBar;


    // const user = useContext(UserContext);
    // console.log(user);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // let log;

    
    // useEffect(() => {
    //     async function getUser() {        
    //         if(user.currUser) {
    //             log = <Link id='link' to='/logout'>Logout</Link>
    //             setIsLoggedIn(true);
    //         } else {
    //             log = <Link id='link' to='/login'>Login</Link>
    //             setIsLoggedIn(false);
    //         }
    //     }
    //     getUser();
    // }, [user, isLoggedIn])
    // console.log(log);

    // let log = user.useContext ? 
    // <Link id='link' to='/logout'>Logout</Link> :
    // <Link id='link' to='/login'>Login</Link>
    // console.log(user);