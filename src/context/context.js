import React, { useState, useEffect, useContext, useCallback } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";
//  `${rootUrl}/users/${user}/repos?per_page=100`;
//  `${rootUrl}/users/${user}/followers`;

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({show: false, msg: ""});

    const searchGithubUser = useCallback(async(user) => {
        toggleError();
        if(user){
            setIsLoading(true);
            try {
                const { data: userData } = await axios.get(`${rootUrl}/users/${user}`);
                if(userData) {
                    setGithubUser(userData);
                    
                    const { login, followers_url } = userData;
                    
                    const { data: repoData } = await axios.get(`${rootUrl}/users/${login}/repos?per_page=100`);
                    const { data: followersData } = await axios.get(`${followers_url}?per_page=100`);
                    
                    if(repoData){
                        setRepos(repoData);
                    }
                    if(followersData){
                        setFollowers(followersData);
                    }
                    
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    toggleError(true, "User doesn't exists!");
                    console.log("no data");
                }
            } catch (error) {
                console.error(error&&error.data?error.data.message:error.data);
            }
        } else {
            console.log("no query found!");
            return;
        }
    },[])

    const checkRequests = useCallback(async() => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${rootUrl}/rate_limit`);
            
            if(data) {
                setIsLoading(false);
                let { rate: { remaining } } = data;
                setRequests(remaining);
                if(remaining === 0) {
                    toggleError(true, "sorry you've run out of requests! please try again in an hour time.");
                }
            } else {
                setIsLoading(false);
                console.log("error");
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    },[])

    function toggleError(show = false, msg = "") {
        setIsError({show, msg});
    };

    useEffect(() => {
        searchGithubUser();
    }, [searchGithubUser])

    useEffect(() => {
        checkRequests();
    }, [checkRequests])

    const globalValues = {
        githubUser, repos, followers, requests, isError, isLoading,
        searchGithubUser, toggleError
    }

    return (
        <GithubContext.Provider value={{...globalValues}}>
            {children}
        </GithubContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(GithubContext);
}

export { useGlobalContext, GithubProvider };