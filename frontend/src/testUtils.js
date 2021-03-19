import React from "react";
import UserContext from "./UserContext";

const demoUser = {username: "jreid", firstName: "James", lastName: "Reid", email: "jreidmke@gmail.com", isAdmin: false, applcations: []};

const UserProvider =
    ({ children, currUser = demoUser, hasAppliedToJob = () => false }) => (
    <UserContext.Provider value={{ currUser, hasAppliedToJob }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };
