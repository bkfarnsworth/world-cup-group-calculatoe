import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import "react-select/dist/react-select.css";
import groups from "./groups";
import GroupResultGenerator from "./GroupResultGenerator";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

class Calculator extends React.Component {
  constructor(...args) {
    super(...args);

    this.resultGenerator = new GroupResultGenerator();

    this.state = {
      selectedGroup: { value: "D", label: "D" },
      results: []
    };
  }

  componentDidMount() {
    this.generateResults()
  }

  handleChange(selectedGroup) {
    this.setState({ 
      selectedGroup,
      results: []
    });
  }

  renderMatch(m) {
    if(m.played) {
      return (
        <div>
          {m.team1} vs {m.team2}: {m.team1Score} - {m.team2Score}
        </div>
      );
    } else {
      return (
        <div>
          {m.team1} vs {m.team2}
        </div>
      );
    }
    
  }

  renderResult(r, index, group) {

    let qualifications = r.getQualifications(group);

    return (
      <div className="result">
        <br />
        <div><b>Result {index + 1}</b></div>
        <br/>
        {r.matchResults.map(mr => {
          return (
            <div>
              {mr.match.team1} vs {mr.match.team2} = {mr.winner}
            </div>
          )
        })}
        <br/>
        <div>Standings</div>
        <table>
          <tbody>
            <tr>
              <th>Position</th>
              <th>Country</th>
              <th>Points</th>
              <th>GD</th>
              <th>GF</th>
              <th>Fair Play Points</th>
            </tr>
            {qualifications.map((q, i) => {
              let style = {color: i <= 1 ? 'green' : 'black'};
              return (
                <tr style={style}>
                  <td>{i + 1}</td>
                  <td>{q.team}</td>
                  <td>{q.points}</td>
                  <td>{3}</td>
                  <td>{2}</td>
                  <td>{6}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <br/>
      </div>
    )
  }

  generateResults() {
    let results = this.resultGenerator.generate(this.selectedGroupModel);
    this.setState({results});
  }

  get selectedGroupModel() {
    return groups.find(g => g.id === this.state.selectedGroup.value);
  }

  get selectOptions() {
    return [
      { value: "A", label: "A" }, 
      { value: "B", label: "B" },
      { value: "C", label: "C" },
      { value: "D", label: "D" },
      { value: "E", label: "E" },
      { value: "F", label: "F" },
      { value: "G", label: "G" },
      { value: "H", label: "H" },
    ]
  }

  render() {
    let group = this.selectedGroupModel;
    if(!group) {
      return "this group has not been added yet";
    }

    let playedMatches = group.matches.filter(m => m.played);
    let futureMatches = group.matches.filter(m => !m.played);

    return (
      <div>
        <Select
          name="form-field-name"
          value={this.state.selectedGroup}
          onChange={this.handleChange.bind(this)}
          options={this.selectOptions}
        />
        <div>
          <br />
          <div>Given that these games have happened:</div>
          <br/>
          {playedMatches.map(m => this.renderMatch(m))}
          <br />
          <div>AND</div>
          <br />
          <div>Given that these games will happen:</div>
          <br />
          {futureMatches.map(m => this.renderMatch(m))}
          <br />
          <button onClick={this.generateResults.bind(this)}>
            Generate results
          </button>
          <div className="results-container">
            {this.state.results.map((r, i) => this.renderResult(r, i, group))}
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
