import React from "react";
import Chatkit from "@pusher/chatkit-client";

import MessageList from "./components/messageList";
import SendMessageForm from "./components/sendMessageForm";
import RoomList from "./components/roomList";
import NewRoomForm from "./components/newRoomForm";

import { tokenUrl, instanceLocator } from "./config";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      username: ""
    };
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: "jb-auth",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          },
          messageLimit: 15
        });
      })
      .catch(error => {
        console.log("chatManager error", error);
      });
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.currentUser.rooms[0].id
    });
  }

  render() {
    return (
      <div className="App">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
