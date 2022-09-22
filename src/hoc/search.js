import { Input, Space } from "antd";
import React from "react";
const { Search } = Input;

export default class AppSearchBar extends React.Component {
  onSearch(searchString) {
    this.props.onSearch(searchString);
  }

  render() {
    return (
      <Space direction="vertical">
        <Search
            className="cy-search-field"
            placeholder="Search movies"
            style={{ width: this.props.width || 400 }}
            onSearch={this.onSearch.bind(this)}
          />
      </Space>
    );
  }
}
