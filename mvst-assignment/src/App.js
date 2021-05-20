import React, { useState, useEffect } from "react";
//import axios from "axios";

import "./App.css";

function App() {
  const [repos, setRepos] = useState([]);
  const [repoResearch, setRepoResearch] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = () => {
    fetch(`api.github.com/users/${username}/repos`, {
      username: "example",
    })
      .then((res) => res.json())
      .then((username) => setUsername(username))
      .then((data) => setRepos(data))
      // console
      //   .log(data)
      //  setUsername(username);

      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setRepoResearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRepos();
  };

  return (
    <div className="App">
      <h1>My GitHub repositories</h1>

      <form>
        <input
          className="me-2"
          type="text"
          aria-label="Search"
          value={repoResearch}
          onChange={handleChange}
          placeholder="Search repo..."
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>

      <div className="reposList">
        {/* I not only used map to go through the list of repositories but I also added a filter function, because that's what the search bar is going to do*/}
        {repos
          .filter((repo) => {
            if (repoResearch === "") {
              return repo;
            } else if (
              repo.name.toLowerCase().includes(repoResearch.toLowerCase())
            ) {
              return repo;
            }
          })
          .map((repo) => {
            if (repo)
              return (
                <div key={repo.id}>
                  <ul>
                    <li>{repo.name}</li>
                  </ul>
                </div>
              );
          })}
      </div>
    </div>
  );
}

export default App;
