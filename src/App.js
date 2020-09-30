import React, { Component } from "react";
import ReactionsView from "./components/ReactionView/ReactionView";
import {
  getReactions,
  getContentReactions,
  getUsers,
  postContentReactions,
} from "./shared/APIController";
import Emoji from "a11y-react-emoji";
import { getUnique } from "./shared/utils";
import { Skeleton } from "antd";
import { debounce } from "lodash";
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
      getContentReactions().then((contentReactions) =>
        this.setState({ contentReactions })
      )
    );
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
                  debounce(
                    this.handleEmojiClick,
                    250
                  )({
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
              popoverButtonContentEmojis={this.getPopoverButtonContentEmojis({
                reactions,
                content_id: contentId,
              })}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
