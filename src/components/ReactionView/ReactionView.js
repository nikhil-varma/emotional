import React, { Component } from "react";
import Emoji from "a11y-react-emoji";

// This class is used to show the emoji(s) and statistics
class ReactionButton extends Component {
  render() {
    const { reactions, userReactions, users } = this.props;
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
      <ReactionButton
        popoverContent={popoverContentEmojis}
        className="reaction-button"
      />
    );
  }
}

export default ReactionButton;
