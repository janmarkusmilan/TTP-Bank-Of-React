import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        userName: "",
        password: "",
      },
      redirect: false,
    };
  }

  handleChange = (e) => {
    const updatedUser = { ...this.state.user };
    const inputField = e.target.name;
    const inputValue = e.target.value;
    updatedUser[inputField] = inputValue;

    this.setState({ user: updatedUser });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.mockLogIn(this.state.user);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/userProfile" />;
    }

    return (
      <div style={loginStyle}>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} style={formStyle}>
          <div>
            <label>Username </label>
            <input
              type="text"
              name="userName"
              onChange={this.handleChange}
              value={this.state.user.userName}
            />
          </div>
          <div>
            <label>Password </label>
            <input type="password" name="password" />
          </div>
          <br />
          <button>Log In</button>
        </form>
        <br />
        <Link to="/">
          <button>Back To Home</button>
        </Link>
      </div>
    );
  }
}

const formStyle = {
  marginTop: "10px",
};

const loginStyle = {
  textAlign: "center",
};

export default LogIn;
