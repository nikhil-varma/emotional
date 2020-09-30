import React, { Component } from "react";
import ReactionButton from "./ReactionButton";
import SummaryView from "..//SummaryView/SummaryView";
import { Popover, Button } from "antd";
import Emoji from "a11y-react-emoji";
class ReactionsView extends Component {
  state = {
    clicked: false,
    hovered: false,
  };

  hide = () => {
    this.setState({
      clicked: false,
      hovered: false,
    });
  };

  handleHoverChange = (visible) => {
    this.setState({
      hovered: visible,
      clicked: false,
    });
  };

  handleClickChange = (visible) => {
    this.setState({
      clicked: visible,
      hovered: false,
    });
  };

  getSummaryView = () => {
    const { users, contentReactions, reactions } = this.props;
    return (
      <SummaryView
        contentReactions={contentReactions}
        reactions={reactions}
        users={users}
      />
    );
  };

  getEmojiView = () => {
    const { reactions } = this.props;
    return (
      <span className="summary-emojis">
        {reactions.slice(0, 3).map((reaction) => (
          <Emoji symbol={reaction.emoji} key={reaction.id} />
        ))}
      </span>
    );
  };

  getHoverSummaryView = () => {
    const { contentReactions, users } = this.props;
    const topUsers = contentReactions
      .map((i) => i.user_id)
      .slice(0, 3)
      .map((user) => users.find((u) => u.id === user));
    const view = topUsers.map((user) => (
      <div className="user-list" key={user.id}>
        {user.first_name}
        {user.last_name}
      </div>
    ));
    return (
      <>
        {view} <div className="more">more....</div>
      </>
    );
  };

  render() {
    const {
      contentReactions,
      popoverButtonContentEmojis,
      ...rest
    } = this.props;
    const { hovered, clicked } = this.state;
    return (
      <>
        <div className="stats-view">
          <Popover
            style={{ width: 500 }}
            content={this.getHoverSummaryView()}
            trigger="hover"
            visible={hovered}
            onVisibleChange={this.handleHoverChange}
          >
            <Popover
              return
              content={this.getSummaryView()}
              trigger="click"
              visible={clicked}
              onVisibleChange={this.handleClickChange}
              placement="bottom"
              overlayClassName="stats-view-popover"
            >
              <Button type="link">
                {this.getEmojiView()}
                {contentReactions.length}
              </Button>
            </Popover>
          </Popover>
        </div>
        <ReactionButton
          content={popoverButtonContentEmojis}
          className="reaction-button"
          type="link"
          popOverplacement="top"
          onPopoverOpen={this.handlePopoverOpen}
          onPopoverClose={this.handlePopoverClose}
          {...rest}
        />
      </>
    );
  }
}

export default ReactionsView;
