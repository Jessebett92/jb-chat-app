import React from "react";

class NewRoomForm extends React.Component {
  constructor() {
    super();

    this.state = {
      roomName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({ roomName: "" });
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    });
  }

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.roomName}
            onChange={this.handleChange}
            type="text"
            placeholder="NewRoomForm"
            required
          />
          <button id="create-room-btn" type="submit">
            *
          </button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
