import { Avatar, List, Button } from "antd";
import React from "react";

export default class AppList extends React.Component {
  onButtonClicked(itemKey, title, year, avatar) {
    if (this.props.onButtonClicked) {
      this.props.onButtonClicked(itemKey, title, year, avatar);
    }
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.data || []}
        pagination={{
          pageSize: this.props.pageSize || 5,
        }}
        renderItem={(item) => (
          <List.Item
            key={item[this.props.uniqueKey]}
            actions={[
              this.props.buttonName && (
                <Button
                  disabled={this.props.disabledButtons.includes(
                    item[this.props.uniqueKey]
                  )}
                  onClick={this.onButtonClicked.bind(
                    this,
                    item[this.props.uniqueKey],
                    item["Title"],
                    item["Year"],
                    item["Poster"]
                  )}
                >
                  {this.props.buttonName}
                </Button>
              ),
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.Poster} />}
              title={item.Title}
              description={item.Year}
            />
          </List.Item>
        )}
      />
    );
  }
}
