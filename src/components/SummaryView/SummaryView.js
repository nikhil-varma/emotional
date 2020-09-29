import React, { Component } from "react";
import { Tabs } from "antd";
import Emoji from "a11y-react-emoji";
import ListView from "./ListView";
const { TabPane } = Tabs;
class SummaryView extends Component {
  render() {
    const { contentReactions, reactions, users } = this.props;
    return (
      <Tabs defaultActiveKey="0">
        {reactions.map((i, k) => (
          <TabPane tab={<Emoji className="emoji" symbol={i.emoji} />} key={k}>
            <ListView
              userReactions={contentReactions.filter(
                (userReactions) => userReactions.reaction_id === i.id
              )}
              users={users}
            />
          </TabPane>
        ))}{" "}
      </Tabs>
    );
  }
}

export default SummaryView;
