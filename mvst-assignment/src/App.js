import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    getRepos();
  }, []);

  getRepos = async () => {
    try {
      const reposList = axios.get("", {});
      setRepos(reposList.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
