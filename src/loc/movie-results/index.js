import React from "react";
import openNotificationWithIcon from "../../hoc/alert";
import Card from "../../hoc/card";
import AppList from "../../hoc/list";

export default class MovieResults extends React.Component {
  constructor(props) {
    super(props);
    this.uniqueKey = "imdbID";
    this.state = {
      nominatedMovies: {},
      movieList: this.props.movieList,
    };
  }

  componentDidUpdate(props) {
    console.log(this.props.movieList, this.state)
    if (this.props.movieList !== props.movieList && this.props.movieList) {
      this.setState({
        movieList: this.props.movieList,
      });
    }
  }
  
  renderTitle(searchString) {
    if (searchString) {
      return <span>Search results for "{this.props.searchString}"</span>;
    }
  }

  onMovieNominated(movieId, movieName, releaseYear, avatar) {
    if(Object.keys(this.state.nominatedMovies).length  === 5) {
      openNotificationWithIcon("error", "You have already nominated 5 movies");
    }else {
      this.setState(
        {
          nominatedMovies: {
            ...this.state.nominatedMovies,
            ...{ [movieId]: { movieName, releaseYear, avatar } },
          },
        },
        () => {
          // registered callback is invoked when state variable has been udpated
          if (this.props.onMovieNominated) {
            this.props.onMovieNominated(this.state.nominatedMovies);
            if(Object.keys(this.state.nominatedMovies).length === 5) {
              openNotificationWithIcon("success", "Yayy! You have nominated 5 movies");
            }
          }
        }
      );
    }
  }

  render() {
    return (
      <Card
        title={this.renderTitle(this.props.searchString)}
        className={this.props.className}
      >
        {this.state.movieList.length > 0 ? (
          <AppList
            data={this.state.movieList}
            buttonName="Nominate"
            uniqueKey={this.uniqueKey}
            onButtonClicked={this.onMovieNominated.bind(this)}
            disabledButtons={Object.keys(this.state.nominatedMovies)}
          />
        ) : (
          <span>No results to show!</span>
        )}
      </Card>
    );
  }
}
