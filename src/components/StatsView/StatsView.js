import React, { Component } from "react";
import { Popover, Button } from "antd";
import { withSkeleton } from "../../shared/withSkeleton";

class StatsView extends Component {
  render() {
    const {
      hovered,
      clicked,
      contentReactions,
      handleClickChange,
      getSummaryView,
      getEmojiView,
      getHoverSummaryView,
      handleHoverChange,
    } = this.props;
    return (
      <div className="stats-view">
        <Popover
          style={{ width: 500 }}
          content={getHoverSummaryView}
          trigger="hover"
          visible={hovered}
          onVisibleChange={handleHoverChange}
        >
          <Popover
            return
            content={getSummaryView}
            trigger="click"
            visible={clicked}
            onVisibleChange={handleClickChange}
            placement="bottom"
            overlayClassName="stats-view-popover"
          >
            <Button type="link">
              {getEmojiView()}
              {contentReactions.length}
            </Button>
          </Popover>
        </Popover>
      </div>
    );
  }
}

export default withSkeleton(StatsView);
