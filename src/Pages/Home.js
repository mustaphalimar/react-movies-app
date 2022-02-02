import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Movies from "../Components/Movies";
import SingleMovie from "../Components/SingleMovie";
import { useGlobalContext } from "../context";
import "./Pages.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";

const Home = () => {
  const { movies, setCurrentId, isSidebarToggled } = useGlobalContext();

  return (
    <Router>
      <main className="main-home">
        <Navbar />
        <div className="main-all">
          <div className="home">
            <div className="side-bar">
              <Sidebar />
            </div>
            <section
              className={`home-section ${
                isSidebarToggled ? "margin-home-section" : ""
              }`}
            >
              <Switch>
                <Route exact path="/">
                  <Movies {...movies} />
                </Route>
                <Route path="/movie/:id">
                  <SingleMovie setCurrentId={setCurrentId} />
                </Route>
              </Switch>
            </section>
          </div>
        </div>
        <footer>
          <p>
            Developed by &#10084;{" "}
            <a
              href="https://instagram.com/tapham079"
              rel="noreferrer"
              target="_blank"
            >
              Mustapha Limar
            </a>{" "}
            | All Rights Reserved &copy; 2020{" "}
          </p>
        </footer>
      </main>
    </Router>
  );
};

export default Home;
