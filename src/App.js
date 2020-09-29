import React, { Component } from "react";
import ReactionsView from "./components/ReactionView/ReactionView";
import {
  getReactions,
  getContentReactions,
  getUsers,
} from "./shared/APIController";
import Emoji from "a11y-react-emoji";

import "./App.scss";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reactions: [],
      contentReactions: [],
      users: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    Promise.all([getReactions, getContentReactions(), getUsers]).then(
      ([reactions, contentReactions, users]) => {
        const uniqueContentReactions = contentReactions
          .map((i) => i.reaction_id)
          .filter((val, idx, src) => src.indexOf(val) === idx);

        const relevantContentReactions = reactions.filter((reaction) =>
          uniqueContentReactions.find(
            (relevantReaction) => reaction.id === relevantReaction
          )
        );
        this.setState({
          reactions: relevantContentReactions,
          contentReactions,
          users,
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
    const { reactions, contentReactions, users, isLoading } = this.state;

    return (
      <div className="app-container">
        <ReactionsView
          reactions={reactions}
          className="reaction-button"
          contentReactions={contentReactions}
          users={users}
          isLoading={isLoading}
          contentId
          popoverButtonContentEmojis={this.getPopoverButtonContentEmojis({
            reactions,
          })}
        />
      </div>
    );
  }
}

export default App;
