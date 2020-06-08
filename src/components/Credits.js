import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";
import axios from "axios";

class Credits extends Component {
  constructor() {
    super();
    this.state = {
      credits: [],
      id: "",
      description: "",
      amount: null,
      date: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then((response) => {
        const data = response.data;
        this.setState({ credits: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  handleAmount = (e) => {
    if (isNaN(e.target.value)) {
      alert("Invalid input. Please enter a number only.");
    } else {
      this.setState({ amount: e.target.value });
    }
  };

  addCredit = (e) => {
    if (this.state.description !== "" && this.state.amount != null) {
      e.preventDefault();

      const creditInfo = this.state.credits;

      const newBalance =
        this.props.accountBalance - parseInt(this.state.amount);
      this.props.updateBalance(newBalance);

      const id = Math.floor(Math.random() * 9999999999) + 1;
      const date = new Date().toLocaleDateString("en-US");

      this.setState({
        id,
        date,
      });

      creditInfo.unshift({
        id,
        description: this.state.description,
        amount: this.state.amount,
        date,
      });

      this.setState({
        credits: creditInfo,
      });
    } else {
      e.preventDefault();
      alert("Invalid input. Enter a description and an amount.");
    }
  };

  render() {
    return (
      <div style={creditStyle}>
        <h1>Credits</h1>
        <AccountBalance accountBalance={this.props.accountBalance} />
        <br />
        <form onSubmit={this.addCredit}>
          <input
            value={this.state.description}
            onChange={this.handleDescription}
            placeholder="Enter Description"
          ></input>
          <input
            value={this.state.amount}
            onChange={this.handleAmount}
            placeholder="Enter Amount"
          ></input>
          <button>Add Credit</button>
        </form>
        <br />
        <Link to="/">
          <button>Back To Home</button>
        </Link>
        <br />
        <br />
        {this.state.credits.map((data) => {
          return (
            <div style={outputStyle}>
              <p>{data.description}</p>
              <p>{data.amount}</p>
              <p>{data.date}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const creditStyle = {
  textAlign: "center",
};

const outputStyle = {
  border: "1px solid black",
  background: "lightgrey",
};

export default Credits;
