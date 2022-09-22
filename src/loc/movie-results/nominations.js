import React from "react";
import Card from "../../hoc/card";
import AppList from "../../hoc/list";

export default class Nominations extends React.Component {
  constructor(props) {
    super(props);
    this.uniqueKey = "imdbID";
    this.state = {
      nominations: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.nominations !== this.props.nominations &&
      this.props.nominations
    ) {
      this.setState({
        nominations: this.transformNominations(this.props.nominations),
      });
    }
  }

  onMovieRemoved(uniqueId) {
    const filteredMovies = this.state.nominations.filter(
      (movie) => movie[this.uniqueKey] !== uniqueId
    );
    this.setState(
      {
        nominations: filteredMovies,
      },
      () => {
          // Once the state has been updated in the local component
          // propagate this to the parent component
        if (this.props.onMovieRemoved) {
          this.props.onMovieRemoved(uniqueId);
        }
      }
    );
  }

  transformNominations(nominations) {
    const transformedList = [];
    if (nominations) {
      for (const key in nominations) {
        transformedList.push({
          imdbID: key,
          Title: nominations[key]["movieName"],
          Year: nominations[key]["releaseYear"],
          Poster: nominations[key]["avatar"],
        });
      }
    }

    return transformedList;
  }

  render() {
    const nominations = this.state.nominations;
    return nominations.length > 0 ? (
      <Card title="Nominations" className={`${this.props.className} cy-nominations-card`}>
        <AppList
          data={nominations}
          buttonName="Remove"
          uniqueKey={this.uniqueKey}
          onButtonClicked={this.onMovieRemoved.bind(this)}
          disabledButtons={[]}
        />
      </Card>
    ) : (
      <Card title="" className={this.props.className}>
        <span className="cy-no-nominations">No nominations made yet!</span>
      </Card>
    );
  }
}
