import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({show: false, msg: ""});

    const checkRequests = async() => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${rootUrl}/rate_limit`);
            
            if(data) {
                setLoading(false);
                let { rate: { remaining } } = data;
                setRequests(remaining);
                if(remaining === 0) {
                    toggleError(true, "sorry you've run out of requests! please try again in an hour time.");
                }
            } else {
                setLoading(false);
                console.log("error");
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    function toggleError(show = false, msg = "") {
        setError({show, msg});
    };

    useEffect(() => {
        checkRequests();
    }, [])

    const globalValues = {
        githubUser, repos, followers, requests, error,
        setGithubUser,
    }

    return (
        <GithubContext.Provider value={{...globalValues}}>
            {children}
        </GithubContext.Provider>
    )
}

export { GithubProvider, GithubContext };