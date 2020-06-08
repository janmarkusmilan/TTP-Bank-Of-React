import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div style={homeStyle}>
        <h1>Bank of React</h1>

        <Link to="/userProfile">
          <button>User Profile</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/debits">
          <button>Debits</button>
        </Link>
        <Link to="/credits">
          <button>Credits</button>
        </Link>
        <br />
        <br />
        <AccountBalance accountBalance={this.props.accountBalance} />
      </div>
    );
  }
}

const homeStyle = {
  textAlign: "center",
};

export default Home;
