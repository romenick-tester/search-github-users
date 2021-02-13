import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const stateValues = {
    msg: "Hello"
}

const GithubProvider = ({ children }) => {
    return (
        <GithubContext.Provider value={{...stateValues}}>
            {children}
        </GithubContext.Provider>
    )
}

export { GithubProvider, GithubContext };