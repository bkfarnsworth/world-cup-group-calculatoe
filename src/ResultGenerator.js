export default class ResultGenerator {


  generate(group) {

    let undeterminedMatches = group.matches.filter(m => {
      return m.played === false;
    });

    let results = this.getAllMatchPossiblities(undeterminedMatches);
    return results;
  }

  getAllMatchPossiblities(matches) {

    let match1 = matches[0]
    let remainingMatches = matches.slice(1);
    let outcomes = outcomes(match1)

    let results = [
      outcomes[0], ...this.getAllMatchPossiblities(remainingMatches),
      outcomes[1], ...this.getAllMatchPossiblities(remainingMatches),
      outcomes[2], ...this.getAllMatchPossiblities(remainingMatches)
    ]
  }

  getOutcomes(match) {
    return [
      { match, winner: match.team1 },
      { match, winner: match.team2 },
      { match, winner: 'Draw' },
    ]
  }
}
