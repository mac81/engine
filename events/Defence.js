export class DefenceEvents {

  constructor(home, away) {
    this.hometeam = home;
    this.awayteam = away;
  }

  simulate(teamInPossesion) {
    this.teamInPossesion = teamInPossesion;

    const eventId = Math.floor(Math.random() * 4) + 1;
    const eventType = 'shortpass'//MIDFIELD_EVENTS[eventId];

    switch(eventType) {
    case 'shortpass':
      return this.shortpass();
    }
  }

  shortpass() {
    return {
      attemptTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
      resultTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
      attemptType: 'shortpassToMidfield',
      eventType: 'shortpassToMidfieldSucceded'
    }
  }
}
