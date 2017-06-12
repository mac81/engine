const MIDFIELD_EVENTS = {
  0: 'shortpass',
  1: 'longpass',
  2: 'dribble',
  3: 'header'
};

export class MidfieldEvents {

  constructor(home, away) {
    this.hometeam = home;
    this.awayteam = away;
  }

  simulate(teamInPossesion) {
    this.teamInPossesion = teamInPossesion;

    const eventId = Math.floor(Math.random() * 4) + 1;
    const midEvent = 'shortpass'//MIDFIELD_EVENTS[eventId];

    switch(midEvent) {
    case 'shortpass':
      return this.shortpass();
    case 'longpass':
      console.log('long ball');
      break;
    case 'dribble':
      console.log('dribble');
      break;
    case 'header':
      console.log('header');
      break;
    }
  }

  shortpass() {
    const attackingTeam = this.teamInPossesion === 0 ? this.hometeam : this.awayteam;
    const defendingTeam = this.teamInPossesion === 0 ? this.awayteam : this.hometeam;

    const attackStatPoints = attackingTeam.formation[1] + attackingTeam.formation[2];
    const passTo = Math.floor(Math.random() * attackStatPoints) + 1;

    // Pass to another midfielder
    if(passTo <= 0) {

      const attackProbability = attackingTeam.midfield.passing + Math.floor(Math.random() * 20) + 1;
      const defenceProbability = defendingTeam.midfield.passing + Math.floor(Math.random() * 10) + 1;

      if(attackProbability > defenceProbability) {
        const successProbability = attackingTeam.midfield.passing + Math.floor(Math.random() * 20) + 1;
        const failureProbability = attackingTeam.midfield.positioning + Math.floor(Math.random() * 5) + 1;
        if(successProbability > failureProbability) {
          return {
            attemptTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
            resultTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
            attemptType: 'shortpassToMidfield',
            eventType: 'shortpassToMidfieldSucceded'
          }
        } else {
          return {
            attemptTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
            resultTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
            attemptType: 'shortpassToMidfield',
            eventType: 'shortpassToMidfieldFailed'
          }
        }
      } else {
        return {
          attemptTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
          resultTeam: this.teamInPossesion === 0 ? this.awayteam : this.hometeam,
          attemptType: 'shortpassToMidfield',
          eventType: 'shortpassToMidfieldIntercepted'
        }
      }

    }
    // Pass to an attacker
    else {
      const attackProbability = attackingTeam.midfield.passing + attackingTeam.offence.passing + Math.floor(Math.random() * 10) + 1;
      const defenceProbability = defendingTeam.defence.positioning + defendingTeam.midfield.positioning + Math.floor(Math.random() * 10) + 1;

      if(attackProbability > 0) {
        return {
          attemptTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
          resultTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
          attemptType: 'shortpassToOffence',
          eventType: 'shortpassToOffenceSucceded'
        }
      } else {
        return {
          attemptTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
          resultTeam: this.teamInPossesion === 0 ? this.awayteam : this.hometeam,
          attemptType: 'shortpassToOffence',
          eventType: 'shortpassToOffenceIntercepted'
        }
      }
    }
  }
}
