import React, { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";

function Dashboard(): JSX.Element {
  const { isLoading } = useContext(GithubContext);
  return (
    <main>
      <Navbar />
      <Search />
      {isLoading ? (
        <img src={loadingImage} alt="loaidng" className="loading-img"></img>
      ) : (
        <div>
          <Info />
          <User />
          <Repos />
        </div>
      )}
    </main>
  );
}

export default Dashboard;
