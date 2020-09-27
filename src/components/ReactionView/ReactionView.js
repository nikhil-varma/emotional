import React, { Component } from "react";
import Emoji from "a11y-react-emoji";
import ReactionButton from "./ReactionButton";
import SummaryView from "..//SummaryView/SummaryView";
import { Popover, Button } from "antd";

// This class is used to show the emoji(s) and statistics
class ReactionsView extends Component {
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

  getSummaryView = () => {
    const { users, userReactions, reactions } = this.props;
    return (
      <SummaryView
        userReactions={userReactions}
        reactions={reactions}
        users={users}
      />
    );
  };

  render() {
    const { reactions } = this.props;
    const popoverContentEmojis = (
      <span className="flex justify-center">
        {reactions.map((reaction) => {
          const { emoji, id } = reaction;
          return (
            <span className="emoji-wrapper" key={id}>
              {" "}
              <Emoji
                className="emoji"
                symbol={emoji}
                onClick={() => this.handleEmojiClick(id)}
              />
              <div className="info">{reaction.name}</div>
            </span>
          );
        })}
      </span>
    );
    return (
      <>
        <div className="stats-view">
          <Popover
            return
            content={this.getSummaryView()}
            trigger="click"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
            placement="top"
            overlayClassName="stats-view-popover"
          >
            <Button type="link">see all</Button>
          </Popover>
        </div>
        <ReactionButton
          popoverContent={popoverContentEmojis}
          className="reaction-button"
          type="link"
          popOverplacement="bottom"
        />
      </>
    );
  }
}

export default ReactionsView;
