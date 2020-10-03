import React, { Component } from "react";
import ReactionsView from "./components/ReactionView/ReactionView";
import {
  getReactions,
  getContentReactions,
  getUsers,
  postContentReactions,
} from "./shared/APIController";
import { getUnique } from "./shared/utils";
import { Skeleton } from "antd";
import "./App.scss";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reactions: [],
      contentReactions: [],
      users: [],
      isLoading: true,
      uniqueContentIdList: [],
    };
  }
  componentDidMount() {
    Promise.all([getReactions, getContentReactions(), getUsers]).then(
      ([reactions, contentReactions, users]) => {
        const uniqueContentIdList = getUnique(contentReactions, "content_id");
        this.setState({
          reactions,
          contentReactions,
          users,
          uniqueContentIdList,
          isLoading: false,
        });
      }
    );
  }

  handleEmojiClick = ({ reaction_id, content_id }) => {
    postContentReactions({ reaction_id, content_id, user_id: 4 }).then(
      getContentReactions().then((cr) => {
        const uniqueContentIdList = getUnique(cr, "content_id");
        const totalReactions = this.state.contentReactions;
        const contentReactions = [
          ...totalReactions,
          {
            id: totalReactions.length + 1,
            reaction_id,
            content_id,
            user_id: 4,
          },
        ];
        this.setState({ contentReactions, uniqueContentIdList });
      })
    );
  };

  render() {
    const {
      reactions,
      contentReactions,
      users,
      isLoading,
      uniqueContentIdList,
    } = this.state;

    return (
      <div className="app-container">
        {isLoading ? <Skeleton /> : null}
        {uniqueContentIdList.map((contentId) => (
          <div key={contentId} className="content">
            <ReactionsView
              reactions={reactions.filter((reaction) =>
                getUnique(
                  contentReactions.filter((cR) => cR.content_id === contentId),
                  "reaction_id"
                ).find((relevantReaction) => reaction.id === relevantReaction)
              )}
              className="reaction-button"
              contentReactions={contentReactions.filter(
                (cR) => cR.content_id === contentId
              )}
              users={users}
              contentId={contentId}
              handleEmojiClick={this.handleEmojiClick}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
