import React, { Component } from "react";
import ReactionButton from "./components/ReactionView/ReactionButton";
import ReactionView from "./components/ReactionView/ReactionView";
import Emoji from "a11y-react-emoji";
import SummaryView from "./components/SummaryView/SummaryView";
import "./App.scss";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reactions: [],
      userReactions: [],
      users: [],
    };
  }
  componentDidMount() {
    fetch("https://artful-iudex.herokuapp.com/reactions")
      .then((res) => res.json())
      .then((reactions) => {
        this.setState({ reactions });
      });
    fetch("https://artful-iudex.herokuapp.com/user_content_reactions")
      .then((res) => res.json())
      .then((userReactions) => {
        this.setState({ userReactions });
      });
    fetch("https://artful-iudex.herokuapp.com/users")
      .then((res) => res.json())
      .then((users) => {
        this.setState({ users });
      });
  }
  handleEmojiClick = (e) => {
    const { callback } = this.props;
    callback && callback();
  };
  render() {
    const { reactions, userReactions, users } = this.state;
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
        <ReactionView reactions={reactions} />
        <SummaryView
          userReactions={userReactions}
          reactions={reactions}
          users={users}
        />
      </div>
    );
  }
}

export default App;
