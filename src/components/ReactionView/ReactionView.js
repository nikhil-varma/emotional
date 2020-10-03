import React, { Component } from "react";
import ReactionButton from "./ReactionButton";
import SummaryView from "..//SummaryView/SummaryView";
import Emoji from "a11y-react-emoji";
import StatsView from "../StatsView/StatsView";

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
    const { contentReactions, isLoading, ...rest } = this.props;
    const { hovered, clicked } = this.state;
    return (
      <>
        <StatsView
          hovered={hovered}
          clicked={clicked}
          contentReactions={contentReactions}
          handleClickChange={this.handleClickChange}
          getSummaryView={this.getSummaryView}
          getEmojiView={this.getEmojiView}
          getHoverSummaryView={this.getHoverSummaryView}
          handleHoverChange={this.handleHoverChange}
          isLoading={isLoading}
        />
        <ReactionButton
          className="reaction-button"
          type="link"
          popOverplacement="bottom"
          onPopoverOpen={this.handlePopoverOpen}
          onPopoverClose={this.handlePopoverClose}
          {...rest}
        />
      </>
    );
  }
}

export default ReactionsView;
