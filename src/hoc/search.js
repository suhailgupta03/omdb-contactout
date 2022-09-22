import { Input, Space, AutoComplete } from "antd";
import React from "react";
const { Search } = Input;

export default class AppSearchBar extends React.Component {

  constructor(props) {
    super(props);
  }

  onSearch(searchString) {
    this.props.onSearch(searchString);
  }

  render() {
    return (
      <Space direction="vertical">
        <Search
            placeholder="Search movies"
            style={{ width: this.props.width || 400 }}
            onSearch={this.onSearch.bind(this)}
          />
      </Space>
    );
  }
}
