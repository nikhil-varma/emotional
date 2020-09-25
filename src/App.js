import React, { Component } from "react";
import "./App.scss";
import { Popover, Button } from "antd";

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <div>
        <Popover content={content} trigger="focus">
          <Button type="primary">Hover me</Button>
        </Popover>
      </div>
    );
  }
}

export default App;
