import React from "react";
import { useGlobalContext } from "../context";
import Loading from "../Pages/Loading";
import "./Movie.css";
import { movies_pages_list } from "../Pages/data";
import Movie from "./Movie";
import "../App.css";

const Movies = ({ current, movies }) => {
  const { loading, currentCategory, resetAll, page, setPage, search } =
    useGlobalContext();
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  if (loading) {
    return (
      <section className="movies-section">
        <Loading />
      </section>
    );
  }

  return (
    <section className="movies-section">
      <div className="title">
        <div className="title-reload-section">
          <div>
            <h1 className="movie-current-category">
              {movies_pages_list.map((item) => {
                if (item.type === current) {
                  return item.name;
                }
                return null;
              })}
            </h1>
            <div className="underline"></div>
            {search ? <h6 className="search">{search}</h6> : ""}
          </div>
          <div>
            <i onClick={resetAll} className="fas fa-sync-alt"></i>
          </div>
        </div>
        <div className="pages-section">
          {pages.map((pageItem, index) => {
            if (page === pageItem) {
              return (
                <div
                  className="page current-page"
                  onClick={() => setPage(pageItem)}
                  key={index}
                >
                  {pageItem}
                </div>
              );
            }
            return (
              <div
                onClick={() => setPage(pageItem)}
                key={index}
                className="page"
              >
                {pageItem}
              </div>
            );
          })}
        </div>
        {movies && movies.length === 0 ? (
          <div className="no-movies">No movies matches your search..</div>
        ) : (
          ""
        )}
        <div className="movies-category">
          <h3 className="movies-category-type">
            {currentCategory ? currentCategory.name : ""}
          </h3>
        </div>
      </div>
      <section className="movies-show-section">
        {movies &&
          movies.map((movie, index) => {
            return <Movie key={index} {...movie} />;
          })}
      </section>
    </section>
  );
};

export default Movies;
