import { Card } from "antd";
import React from "react";

export default class AppCard extends React.Component {
  renderTitle(title) {
    if (title) {
      return <span>{title}</span>;
    }
  }

  renderChild(childComponent) {
    if (childComponent) {
      return <>{childComponent}</>;
    }
  }

  render() {
    return (
      <Card
        title={this.renderTitle(this.props.title)}
        className={this.props.className || ""}
      >
        {this.renderChild(this.props.children)}
      </Card>
    );
  }
}
