import React, { useState, useEffect } from "react";
import axios from "axios"; // I used axios instead of fetch for no particular reason other than avoiding one line more of code such as .then(res => res.json())
import "./App.css";
//I used both CSS and Bootstrap for styling

function App() {
  const [repos, setRepos] = useState([]);
  const [repoResearch, setRepoResearch] = useState("");
  const [username, setUsername] = useState("Bebe93"); //I used my own username for this exercise because I have several public repositories

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = () => {
    const url = `https://api.github.com/users/${username}/repos`;
    axios
      .get(url, {
        headers: {
          Accept: "application/vnd.github.v3+json", //GitHub itself suggests to use this header
        },
      })

      .then((data) => setRepos(data.data))
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setRepoResearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://api.github.com/users/${username}/repos`;
    axios
      .get(url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
      .then((data) =>
        setRepos(
          data.data.filter((repo) => {
            if (repoResearch === "") {
              return repo;
            } else if (
              repo.name.toLowerCase().includes(repoResearch.toLowerCase())
              //I decided to filter the results in this way so that even if you don't write the whole name of the repo, the function returns all the repos that has the input that has been typed into the search bar
            ) {
              return repo;
            }
          })
        )
      )
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>My GitHub Repositories</h1>

      <form>
        <input
          className="me-2"
          type="text"
          aria-label="Search"
          value={repoResearch}
          onChange={handleChange}
          placeholder="Search repo..."
        />
        <button className="btn" type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>

      <div className="reposList">
        {repos.map((repo) => {
          if (repo)
            return (
              <div key={repo.id}>
                <ul>
                  <li>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                      {repo.name}
                    </a>
                  </li>
                </ul>
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default App;
