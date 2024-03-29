import React from "react";

class SendMessageForm extends React.Component {
  constructor() {
    super();

    this.state = {
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  };

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          disabled={this.props.disabled}
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="SendMessageForm"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
