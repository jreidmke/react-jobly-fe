import './App.css';
import Routes from './Routes';
import {useEffect, useState} from 'react';
import JoblyApi from './api';
import jwt from 'jsonwebtoken';
import UserContext from './UserContext';
import {BrowserRouter} from 'react-router-dom';
import useLocalStorage from "./useLocalStorage";
import NavBar from './NavBar';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, setToken] = useLocalStorage('token');
  const [currUser, setCurrUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(() => {
    async function getToken() {
      if(token) {
        try {
          JoblyApi.token = token;
          const {username} = jwt.decode(token);
          const userResp = await JoblyApi.getCurrUser(username);
          setCurrUser(userResp);
          console.log(userResp);
          setApplicationIds(new Set(userResp.applications));
        } catch (error) {
          console.log(error);
          setCurrUser(null);
        }
      }
      setIsLoaded(true);
    };
    setIsLoaded(false);
    getToken();
  }, [token]);

  function logout() {
    localStorage.clear();
    setToken(null);
    setCurrUser(null);
  }

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (error) {
      console.log('login failure', error);
      return { success: false, error };
    }
  }

  async function register(regData) {
    try {
      let token = await JoblyApi.register(regData);
      setToken(token);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function apply(jobId) {
    if(hasAppliedToJob(jobId)) return;
    JoblyApi.applyToJob(currUser.username, jobId);
    setApplicationIds(new Set([...applicationIds, jobId]));
  }

  if(!isLoaded) return(<div><h1>Loading</h1></div>)

  return (
    <div className="App">
      <UserContext.Provider value={{currUser, setCurrUser, hasAppliedToJob, apply}}>
        <BrowserRouter>
          <NavBar logout={logout}/>
          <Routes login={login} register={register}/>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;


// function printToken() {
//   console.log(currUser);
// }