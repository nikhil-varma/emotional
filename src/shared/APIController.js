import React, { Component } from "react";
import ReactionButton from "./components/ReactionButton/ReactionButton";
import Emoji from "a11y-react-emoji";
import "./App.scss";

class APIController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reactions: [],
    };
  }
  render() {
    const { reactions } = this.state;
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
      <div className="app-container">
        <ReactionButton
          popoverContent={popoverContentEmojis}
          className="reaction-button"
        />
      </div>
    );
  }
}

export default APIController;
