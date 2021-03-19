import { Route } from "react-router-dom";
import Homepage from './Homepage';
import CompanyDetails from "./CompanyDetails";
import CompanyList from './CompanyList';
import JobList from './JobList';
import RegisterForm from "./RegisterForm";
import LoginForm from './LoginForm';
import Profile from './Profile';

const Routes = ({ login, register }) => {
    return(
        <div>
            <Route exact path="/">
                <Homepage/> 
            </Route>

            {/* Company Routing */}
            <Route exact path="/companies">
                <CompanyList/>
            </Route>
            <Route path="/companies/:handle">
                <CompanyDetails/>
            </Route>

            {/* Jobs Routing */}
            <Route exact path="/jobs">
                <JobList/>
            </Route>
            
            {/* User Routing (Login and Reg) */}
            <Route exact path="/login">
                <LoginForm login={login}/>
            </Route>
            <Route exact path="/register">
                <RegisterForm register={register}/>
            </Route>
            <Route exact path="/profile">
                <Profile/>
            </Route>
        </div>
    )
}

export default Routes;