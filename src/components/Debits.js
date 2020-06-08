import React, { Component } from "react";
import { Link } from "react-router-dom";

class Debits extends Component {
  constructor() {
    super();
    this.state = {
      debits: {
        id: "",
        description: "",
        amount: 0,
        date: "",
      },
    };
  }

  render() {
    return (
      <div>
        <h1>Debits</h1>
      </div>
    );
  }
}

export default Debits;
