import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import "react-select/dist/react-select.css";
import groups from "./groups";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Hellofds afds fds CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Calculator />
    </div>
  );
}

class Calculator extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      selectedGroup: { value: "D", label: "D" },
      results: []
    };
  }

  handleChange(selectedGroup) {
    this.setState({ selectedGroup });
  }

  renderMatch(m) {
    return (
      <div>
        {m.team1} vs {m.team2}: {m.team1Score} - {m.team2Score}
      </div>
    );
  }

  generateResults() {
    this.setState({
      results: ["hi"]
    });
  }

  render() {
    let group = groups.find(g => g.id === this.state.selectedGroup.value);
    console.log(group.id);
    let playedMatches = group.matches.filter(m => m.played);
    let futureMatches = group.matches.filter(m => !m.played);

    return (
      <div>
        <Select
          name="form-field-name"
          value={this.state.selectedGroup}
          onChange={this.handleChange.bind(this)}
          options={[{ value: "A", label: "A" }, { value: "B", label: "B" }]}
        />
        <div>
          <div>Given that these games have happened:</div>
          {playedMatches.map(m => this.renderMatch(m))}
          <div>AND</div>
          <div>Given that these games will happen:</div>
          {futureMatches.map(m => this.renderMatch(m))}
          <button onClick={this.generateResults.bind(this)}>
            BUTTONGenerate results
          </button>
          {this.state.results.map(r => {
            return <div>{r}</div>;
          })}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
