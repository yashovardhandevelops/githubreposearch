import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import "./app.css";
import { useSelector, useDispatch } from "react-redux";
import { repositories } from "./actions/action";
import { Container, Grid, Icon } from "semantic-ui-react";

function App() {
  const url = "https://api.github.com";

  const dispatch = useDispatch();
  const repos = useSelector((state) => state.reposReducer.repos);

  // const [repos, setRepos] = useState([])
  const [search, setSearch] = useState("");
  const [request, setRequest] = useState(0);

  const fetchRepos = () => {
    const axios = require("axios");

    axios.get(`${url}/search/repositories?q=${search}`).then((resp) => {
      console.log(resp);
      console.log(resp.data.items);

      let repData = resp.data.items;
      dispatch(repositories(repData));
    }).catch((err) => {
     
       if(err.message.includes("403")){
         alert(`You've exceeded search limit . Pls try after sometime`)
       }
    })
  };

  
  let minimumChar = search.length

  useEffect(() => {
    fetchRepos();
   }, [minimumChar]);

  return (
    <>
      {/* Start Header */}
      <div className="header">
        {/* Start Container */}
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={3}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl1M4mNxYZ-p1nz-TYk2o45fxwUyAqtt-TuQ&usqp=CAU"
                  alt=""
                  className="logo"
                />
              </Grid.Column>
              <Grid.Column width={10}>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Enter GitHub Repo"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-box"
                  />
                </div>
              </Grid.Column>
              <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        {/* End Container */}
      </div>
      {/* End Header */}

      {/* Start Main */}
      <main>
        {/* Start Container */}
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <section className="data">
                  <div className="data-center">
                    {repos &&
                      repos.map((repo) => {
                        return (
                          <article className="data-single" key={repo.id}>
                            <div className="project-name">
                              <span>
                                <Icon name="book" size="small" /> Project Name
                              </span>{" "}
                              :{" "}
                              <a href={repo.html_url} target="_blank">
                                {repo.name}
                              </a>
                            </div>
                            <div className="stargazers-count">
                              <Icon name="globe" size="small" />{" "}
                              <span>Stargazers Count</span> :{" "}
                              {repo.stargazers_count}
                            </div>
                            <div className="watchers-count">
                              <Icon name="eye" size="small" />{" "}
                              <span>Watchers Count</span> :{" "}
                              {repo.watchers_count}
                            </div>
                          </article>
                        );
                      })}
                  </div>
                </section>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        {/* End Container */}
      </main>
      {/* End Main */}
    </>
  );
}

export default App;
