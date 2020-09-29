import React, { Component } from "react";
import ReactionButton from "./ReactionButton";
import SummaryView from "..//SummaryView/SummaryView";
import { Popover, Button } from "antd";
import { withSkeleton } from "../../shared/withSkeleton";
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
    const { users, contentReactions, reactions } = this.props;
    return (
      <SummaryView
        contentReactions={contentReactions}
        reactions={reactions}
        users={users}
      />
    );
  };

  handlePopoverOpen = () => {
    console.log("open");
  };
  handlePopoverClose = () => {
    console.log("closed");
  };

  render() {
    const { contentReactions, popoverButtonContentEmojis } = this.props;
    return (
      <>
        <div className="stats-view">
          <Popover
            return
            content={this.getSummaryView()}
            trigger="hover"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
            placement="bottom"
            overlayClassName="stats-view-popover"
          >
            <Button type="link">{contentReactions.length} more</Button>
          </Popover>
        </div>
        <ReactionButton
          content={popoverButtonContentEmojis}
          className="reaction-button"
          type="link"
          popOverplacement="top"
          onPopoverOpen={this.handlePopoverOpen}
          onPopoverClose={this.handlePopoverClose}
        />
      </>
    );
  }
}

export default withSkeleton(ReactionsView);
