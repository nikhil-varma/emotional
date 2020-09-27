import React, { Component } from "react";
import ReactionsView from "./components/ReactionView/ReactionView";
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
  render() {
    const { reactions, userReactions, users } = this.state;

    return (
      <div className="app-container">
        <ReactionsView
          reactions={reactions}
          className="reaction-button"
          userReactions={userReactions}
          users={users}
        />
      </div>
    );
  }
}

export default App;
