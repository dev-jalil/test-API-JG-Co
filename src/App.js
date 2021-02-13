import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";

class App extends React.Component {
  state = {
    dataVelib: [],
  };

  //constructor(props) {
  //  super(props);
  //this.state = {
  //  dataVelib: {},
  // };
  // }

  componentDidMount() {
    console.log("Fetching de API = " + process.env.REACT_APP_BASE_URL);

    this.fetchData();
  }

  fetchData = () => {
    axios
      .get(process.env.REACT_APP_BASE_URL)
      .then((response) => {
        this.setState({ dataVelib: response.data.records });
        console.log(this.state.dataVelib);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="app">
        <div className="card">
          <h1 className="heading">{this.state.datasetid}</h1>

          <ul>
            {this.state.dataVelib.map((item) => (
              <li key={item.datasetid}>{item.datasetid}</li>
            ))}
          </ul>

          <button className="button" onClick={this.fetchData}>
            <span>UPDATE!</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
