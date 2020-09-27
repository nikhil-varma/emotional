import React, { Component } from "react";
import { Popover, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";

// This class is used to show the emoji(s) and statistics
class ReactionButton extends Component {
  static defaultProps = {
    content: "Like",
    Icon: <LikeOutlined />,
  };
  state = {
    visible: false,
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { content, popoverContent, className } = this.props;
    return (
      <span className={className}>
        <Popover
          return
          content={popoverContent}
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
          placement="bottom"
          overlayClassName={`${className}-popover`}
        >
          <Button type="primary" icon={<LikeOutlined />} {...this.props}>
            {content}
          </Button>
        </Popover>
      </span>
    );
  }
}

export default ReactionButton;
