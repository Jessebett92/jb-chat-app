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
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
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
        this.getRooms();
      })
      .catch(error => {
        console.log("chatManager error", error);
      });
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("joinable rooms error:", err));
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      })
      .catch(error => console.log("error in subscribe to room", error));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  createRoom(roomName) {
    this.currentUser
      .createRoom({
        name: roomName
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(error => console.log("error with createRoom", error));
  }

  render() {
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList
          messages={this.state.messages}
          roomId={this.state.roomId}
        />
        <SendMessageForm
          sendMessage={this.sendMessage}
          disabled={!this.state.roomId}
        />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
