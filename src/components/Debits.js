import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";
import axios from "axios";

class Debits extends Component {
  constructor() {
    super();
    this.state = {
      debits: [],
      id: "",
      description: "",
      amount: null,
      date: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then((response) => {
        const data = response.data;
        this.setState({ debits: data });
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

  addDebit = (e) => {
    if (this.state.description !== "" && this.state.amount != null) {
      e.preventDefault();

      const debitInfo = this.state.debits;

      const newBalance =
        this.props.accountBalance - parseInt(this.state.amount);
      this.props.updateBalance(newBalance);

      const id = Math.floor(Math.random() * 9999999999) + 1;
      const date = new Date().toLocaleDateString("en-US");

      this.setState({
        id,
        date,
      });

      debitInfo.unshift({
        id,
        description: this.state.description,
        amount: this.state.amount,
        date,
      });

      this.setState({
        debits: debitInfo,
      });
    } else {
      e.preventDefault();
      alert("Invalid input. Enter a description and an amount.");
    }
  };

  render() {
    return (
      <div style={debitStyle}>
        <h1>Debits</h1>
        <Link to="/">Back To Home</Link>
        <br />
        <br />
        <AccountBalance accountBalance={this.props.accountBalance} />
        <br />
        <form onSubmit={this.addDebit}>
          <input
            placeholder="Enter Description"
            value={this.state.description}
            onChange={this.handleDescription}
          ></input>
          <input
            placeholder="Enter Amount"
            value={this.state.amount}
            onChange={this.handleAmount}
          ></input>
          <button>Add Debit</button>
        </form>
        <br />
        {this.state.debits.map((data) => {
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

const debitStyle = {
  textAlign: "center",
};

const outputStyle = {
  border: "1px solid black",
  background: "lightgrey",
};

export default Debits;
