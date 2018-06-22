export default class GroupResultGenerator {

  generate(group) {

    let undeterminedMatches = group.matches.filter(m => {
      return m.played === false;
    });

    let groupResults = this.getAllGroupResults(undeterminedMatches);

    //add in matches that have been played

    return groupResults;
  }

  getAllGroupResults(matches) {

    if(!matches[0]) {
      return [];
    }

    let remainingMatches = matches.slice(1);
    let matchResults = this.getMatchResults(matches[0]);

    if (matches.length === 1) {
      let groupResults = matchResults.map(mr => new GroupResult({matchResults: [mr]}));
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

  getMatchResultFromPlayedMatch(match) {
    let winner;
    if(match.team1Score > match.team2Score) {
      winner = match.team1;
    } else if (match.team2Score > match.team1Score) {
      winner = match.team2;
    } else {
      winner = 'Draw';
    }

    return {match, winner};
  }

  getQualifications(group) {
    let determinedMatches = group.matches.filter(m => m.played);
    let allMatchResults = [
      ...this.matchResults,
      ...determinedMatches.map(m => this.getMatchResultFromPlayedMatch(m))
    ]
    let teamPointPairs = group.teams.map(t => {
      return {
        team: t, 
        points: 0
      }
    })

    //for every match result
    allMatchResults.forEach(mr => {

      //give the team points
      if(mr.winner === 'Draw') {
        teamPointPairs.find(tpp => tpp.team === mr.match.team1).points += 1;
        teamPointPairs.find(tpp => tpp.team === mr.match.team2).points += 1;
      } else {
        teamPointPairs.find(tpp => tpp.team === mr.winner).points += 3;
      }
    
    })

    teamPointPairs.sort((a, b) => b.points - a.points);

    return teamPointPairs;

  }


}