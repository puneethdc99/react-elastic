import React, { Component } from "react";
import logo from "./logo.svg";
import { Dropdown, DropdownButton, ListGroup } from "react-bootstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, eData: [], sData: [] };
  }

  getAlltheIndex = () => {
    fetch("http://34.89.89.247:9002/_aliases?pretty=true")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          eData: Object.keys(json)
        });
        console.log(this.state.eData);
      });
  };

  getAlltheData = () => {
    fetch("http://34.89.89.247:9002/edge-logs/_search")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          sData: json.hits.hits
        });
        console.log(this.state.sData);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 onClick={this.getAlltheIndex}>Click Me</h1>
          <h1 onClick={this.getAlltheData}>Click Me 2</h1>
          <select>
            {this.state.eData.map(data => (
              <option value="data.value">{data.toString()}</option>
            ))}
          </select>
          <DropdownButton id="dropdown-basic-button" title="Select the Index">
            {this.state.eData.map(data => (
              <Dropdown.Item>{data.toString()}</Dropdown.Item>
            ))}
          </DropdownButton>
          <ListGroup as="ul">
            {this.state.sData.map(data => (
              <ListGroup.Item as="li" active>
                {data._source.MESSAGE}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </header>
      </div>
    );
  }
}

export default App;
