import "antd/dist/antd.css";
import React from "react";
import "./App.css";
import MovieResults from "./loc/movie-results";
import Nominations from "./loc/movie-results/nominations";
import MovieSearch from "./loc/movie-search";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      searchResults: [], // [{imdbID, Title, ..}]
      nominatedMovies: {}, // {[movieId]: {movieName, releaseYear}}
    };
  }

  onMovieListFetch({ list, searchString }) {
    this.setState({
      searchString,
      searchResults: list["movies"],
    });
  }

  onMovieNominated(nominated) {
    this.setState({ nominatedMovies: nominated });
  }

  onMovieRemovedFromNomination(movieId) {
    const nm = this.state.nominatedMovies;
    delete nm[movieId];
    this.setState({
      nominatedMovies: nm,
    }); // updates by reference
  }

  render() {
    return (
      <>
        <div className="row mt-3">
          <MovieSearch
            className="mt-3"
            onMovieListFetch={this.onMovieListFetch.bind(this)}
          />
        </div>

        <div className="row">
          <div className="col-6">
            <MovieResults
              className="mt-3"
              movieList={this.state.searchResults}
              searchString={this.state.searchString}
              onMovieNominated={this.onMovieNominated.bind(this)}
            />
          </div>

          <div className="col-6">
            <Nominations
              className="mt-3"
              nominations={this.state.nominatedMovies}
              onMovieRemoved={this.onMovieRemovedFromNomination.bind(this)}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
