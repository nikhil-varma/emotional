import React, { Component } from "react";
import { List, Avatar } from "antd";
class ListView extends Component {
  getListView = (userId, userList) => {
    const user = userList.find((user) => user.id === userId);
    return (
      <div>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={user.avatar} />}
            title={<span>{user.first_name}</span>}
            description={user.email}
          />
        </List.Item>
      </div>
    );
  };
  render() {
    const { userReactions, users } = this.props;
    return (
      <List
        itemLayout="horizontal"
        dataSource={userReactions}
        renderItem={(reaction) => this.getListView(reaction.user_id, users)}
      />
    );
  }
}

export default ListView;
