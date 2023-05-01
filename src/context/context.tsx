import React, { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import {
  GithubUserFollowersType,
  GithubUserProfileType,
  RepositoryType,
} from "../types";

const rootUrl = "https://api.github.com";

type ErrorType = { show: boolean; msg: string };

type GithubContextType = {
  githubUser: GithubUserProfileType;
  repos: RepositoryType[];
  followers: GithubUserFollowersType[];
  requests?: number;
  error: ErrorType;
  isLoading: boolean;
  searchGithubUser?: (user: string) => Promise<void>;
};

const GithubContext = createContext<GithubContextType>({
  githubUser: mockUser,
  repos: mockRepos,
  followers: mockFollowers,
  error: { show: false, msg: "" },
  isLoading: false,
});

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [githubUser, setGithubUser] = useState<GithubUserProfileType>(mockUser);
  const [repos, setRepos] = useState<RepositoryType[]>(mockRepos);
  const [followers, setFollowers] =
    useState<GithubUserFollowersType[]>(mockFollowers);

  const [requests, setRequests] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>({
    show: false,
    msg: "",
  });

  const searchGithubUser = async (user: string) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );

    if (response) {
      setGithubUser(response.data);
      const { repos_url, followers_url } = response.data;
      // get the repos
      axios(`${repos_url}?per_page=100`).then((response) => {
        setRepos(response.data);
      });
      // get the followers
      axios(`${followers_url}?per_page=100`).then((response) => {
        setFollowers(response.data);
      });
    } else {
      toggleError(true, "User not found!");
    }
    checkRequests();
    setIsLoading(false);
  };

  // about error: if the user doesn't exist or we used up all our requests

  const checkRequests = () => {
    // axios returns a promise!
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        // console.log(response.data.rate);
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          // throw an error if we used all requests
          toggleError(true, "Requests used up!");
        }
      })
      .catch((error) => console.log(error));
  };

  function toggleError(show: boolean = false, msg: string = "") {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        isLoading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
