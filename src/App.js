import React, { Component } from "react";
import ReactionsView from "./components/ReactionView/ReactionView";
import {
  getReactions,
  getContentReactions,
  getUsers,
} from "./shared/APIController";
import Emoji from "a11y-react-emoji";
import { getUnique } from "./shared/utils";

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
  getPopoverButtonContentEmojis = ({ reactions }) => {
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
                onClick={() => this.handleEmojiClick(id)}
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
        {uniqueContentIdList.map((contentId) => (
          <>
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
              isLoading={isLoading}
              contentId
              popoverButtonContentEmojis={this.getPopoverButtonContentEmojis({
                reactions,
              })}
            />
          </>
        ))}
      </div>
    );
  }
}

export default App;
