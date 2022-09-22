import React from "react";
import Card from "../../hoc/card";
import Search from "../../hoc/search";

import {fetchMovieNames} from "./network-request";

class MovieSearch extends React.Component {

  onSearch(searchString) {
    fetchMovieNames(searchString)
      .then(list => {
        if(this.props.onMovieListFetch) {
          this.props.onMovieListFetch({list, searchString});
          /**
           * list = {movies: [], message: ".."}
           */
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <Card title="Movie title" className={this.props.className}>
        <Search onSearch={this.onSearch.bind(this)} />
      </Card>
    );
  }
}

export default MovieSearch;
