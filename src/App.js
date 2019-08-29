import React from "react";
import Chatkit from "@pusher/chatkit-client";

import MessageList from "./components/messageList";
import SendMessageForm from "./components/sendMessageForm";
import RoomList from "./components/roomList";
import NewRoomForm from "./components/newRoomForm";

import { tokenUrl, instanceLocator } from "./config";

class App extends React.Component {
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
        console.log("currentUser", currentUser.name);
      })
      .catch(error => {
        console.log("chatManager error", error);
      });
  }

  render() {
    return (
      <div className="App">
        <RoomList />
        <MessageList />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
