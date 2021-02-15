import React, { Component } from "react";

class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      isError: false,
    };
  }

  SetDataChild() {
    this.setState({ isLoading: true });
    const users = this.props.data;
    if (users.length > 0) {
      this.setState({ users, isLoading: false });
    }

    /* else {
      if (this.props.data.length == 0) {
        console.log(this.props.data.length);
        this.setState({ isError: true, isLoading: false });
      }
    } */
  }

  async componentDidMount() {
    await this.SetDataChild();
    this.timer = setInterval(() => this.SetDataChild(), 5000);

    //const response = await fetch(process.env.REACT_APP_BASE_URL);
    /*if (response.ok) {
      const data = await response.json();
      const users = data.records;
      this.setState({ users, isLoading: false });
    } else {
      this.setState({ isError: true, isLoading: false });
    }*/
    console.log("didmount => " + this.state.users.length);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getHeaderName() {
    var HeaderName = [
      "recordid",
      "name",
      "capacity",
      "ebike",
      "mechanical",
      "taux de disponibilité",
    ];

    return HeaderName;
  }

  renderTableHeader = () => {
    return this.getHeaderName().map((attr) => (
      <th key={attr}>{attr.toUpperCase()}</th>
    ));
    //const x = this.state.users.map(this.getHeaderName);
    //console.log(x);
    /* return Object.keys(x[0]).map((attr) => (
      <th key={attr}>{attr.toUpperCase()}</th>
    )); */
  };

  TauxDisponibilité(capacity, ebike, mechanical) {
    var txDisponibility = ((ebike + mechanical) / capacity) * 100;
    return Math.floor(txDisponibility) + "%";
  }

  renderTableRows = () => {
    return this.state.users.map((user) => {
      return (
        <tr key={user.recordid}>
          <td>{user.recordid}</td>
          <td>{user.fields.name}</td>
          <td>{user.fields.capacity}</td>
          <td>{user.fields.ebike}</td>
          <td>{user.fields.mechanical}</td>
          <td>
            {this.TauxDisponibilité(
              user.fields.capacity,
              user.fields.ebike,
              user.fields.mechanical
            )}
          </td>
        </tr>
      );
    });
  };

  render() {
    const { users, isLoading, isError } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error</div>;
    }

    return users.length > 0 ? (
      <table>
        <thead>
          <tr>{this.renderTableHeader()}</tr>
        </thead>
        <tbody>{this.renderTableRows()}</tbody>
      </table>
    ) : (
      <div>No users.</div>
    );
  }
}

export default Datatable;
