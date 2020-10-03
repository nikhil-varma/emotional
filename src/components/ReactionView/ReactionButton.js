import React, { Component } from "react";
import { Popover, Button } from "antd";
import Emoji from "a11y-react-emoji";
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

  handleEmojiClick = ({ reaction_id, content_id }) => {
    const { handleEmojiClick } = this.props;
    handleEmojiClick && handleEmojiClick({ reaction_id, content_id });
    this.setState({ visible: false });
  };

  getPopoverButtonContentEmojis = ({ reactions, content_id }) => {
    return (
      <span className="flex justify-center">
        {reactions.map((reaction) => {
          const { emoji, id } = reaction;
          return (
            <span className="emoji-wrapper" key={id}>
              {" "}
              <Emoji
                className="emoji"
                symbol={emoji}
                onClick={() =>
                  this.handleEmojiClick({
                    reaction_id: id,
                    content_id,
                  })
                }
              />
              <div className="info">{reaction.name}</div>
            </span>
          );
        })}
      </span>
    );
  };

  render() {
    const {
      reactions,
      contentId,
      className,
      type,
      popOverplacement,
    } = this.props;
    return (
      <span className={className}>
        <Popover
          return
          content={this.getPopoverButtonContentEmojis({
            reactions,
            content_id: contentId,
          })}
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
