import React, { Component } from "react";
import { Popover, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";

// This class is used to show the emoji(s) and statistics
class ReactionButton extends Component {
  static defaultProps = {
    onPopoverClose: () => {},
    onPopoverOpen: () => {},
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
    const { onPopoverOpen, onPopoverClose } = this.props;
    this.setState({ visible });
    !visible ? onPopoverClose() : onPopoverOpen();
  };

  render() {
    const { content, className, type, popOverplacement } = this.props;
    return (
      <span className={className}>
        <Popover
          return
          content={content}
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
          placement={popOverplacement}
          overlayClassName={`${className}-popover`}
        >
          <Button type={type} className={className} icon={<LikeOutlined />}>
            Like
          </Button>
        </Popover>
      </span>
    );
  }
}

export default ReactionButton;
