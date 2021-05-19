import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [repos, setRepos] = useState([]);
  const [repoResearch, setRepoResearch] = useState("");
  //const [username, setUsername] = useState();

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = async () => {
    try {
      const reposList = await axios.get(`/users/Bebe93/repos`, {});
      setRepos(reposList.data);
    } catch (error) {
      console.log(error);
    }
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
                <div key={repoResearch.id}>
                  <h3>{repoResearch.name}</h3>
                </div>
              );
          })}
      </div>
    </div>
  );
}

export default App;
