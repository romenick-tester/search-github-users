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
    //error usestate

    const checkRequest = async() => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${rootUrl}/rate_limit`);
            
            if(data) {
                setLoading(false);
                let { rate: { remaining } } = data;
                setRequests(remaining);
                if(remaining === 0) {
                    //throw error
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

    useEffect(() => {
        checkRequest();
    }, [])

    const globalValues = {
        githubUser, repos, followers, requests,
        setGithubUser,
    }

    return (
        <GithubContext.Provider value={{...globalValues}}>
            {children}
        </GithubContext.Provider>
    )
}

export { GithubProvider, GithubContext };