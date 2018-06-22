export default class GroupResultGenerator {

  generate(group) {

    let undeterminedMatches = group.matches.filter(m => {
      return m.played === false;
    });

    let groupResults = this.getAllGroupResults(undeterminedMatches);

    console.log(groupResults)
    return groupResults;
  }

  getAllGroupResults(matches) {

    if(!matches[0]) {
      return [];
    }

    let remainingMatches = matches.slice(1);
    let matchResults = this.getMatchResults(matches[0]);

    if (matches.length === 1) {
      let groupResults = matchResults.map(mr => new GroupResult(matchResults: [mr]));
      return groupResults;
    } else {
      let groupResults = [
        ...this.getAllGroupResultsGivenMatchResult(matchResults[0], remainingMatches),
        ...this.getAllGroupResultsGivenMatchResult(matchResults[1], remainingMatches),
        ...this.getAllGroupResultsGivenMatchResult(matchResults[2], remainingMatches),
      ]

      return groupResults;
    }


  }

  getAllGroupResultsGivenMatchResult(givenMatchResult, remainingMatches) {

    let remainingGroupResults = this.getAllGroupResults(remainingMatches);
    let allGroupResults = remainingGroupResults.map(gr => {
      return new GroupResult({matchResults: [givenMatchResult, ...gr.matchResults]});
    });

    return allGroupResults;
  }

  getMatchResults(match) {
    return [
      { match, winner: match.team1 },
      { match, winner: match.team2 },
      { match, winner: 'Draw' },
    ]
  }
}

class GroupResult {
  constructor({matchResults = []} = {}) {
    this.matchResults = matchResults;
  }
}