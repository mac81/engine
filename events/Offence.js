import weighted from 'weighted';

const ATTACK_EVENTS = {
  0: 'shortpass',
  1: 'dribble',
  2: 'shot',
  3: 'header'
};

export class OffenceEvents {

  constructor(home, away) {
    this.hometeam = home;
    this.awayteam = away;
  }

  simulate(teamInPossesion) {
    this.teamInPossesion = teamInPossesion;

    const eventId = Math.floor(Math.random() * 4) + 1;
    const eventType = 'shot'//MIDFIELD_EVENTS[eventId];

    switch(eventType) {
    case 'shot':
      return this.shot();
    }
  }

  shot() {
    const attackingTeam = this.teamInPossesion === 0 ? this.hometeam : this.awayteam;
    const defendingTeam = this.teamInPossesion === 0 ? this.awayteam : this.hometeam;

    const shotOptions = {
      'on-target': 0.5,
      'off-target': 0.5
    };

    const shotOutcome = weighted.select(shotOptions);

    if(shotOutcome === 'on-target') {
      const onTargetOptions = {
        'goal': 1,
        'saved': 0
      };

      const onTargetOutcome = weighted.select(onTargetOptions);

      return {
        attemptTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
        resultTeam: this.teamInPossesion === 0 ? this.awayteam : this.hometeam,
        attemptType: 'shot',
        eventType: onTargetOutcome
      }

    } else {
      const offTargetOptions = {
        'goalkick': 1
      };

      const offTargetOutcome = weighted.select(offTargetOptions);

      return {
        attemptTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
        resultTeam: this.teamInPossesion === 0 ? this.awayteam : this.hometeam,
        attemptType: 'shot',
        eventType: offTargetOutcome
      }
    }

    // outcomes:
      // shot on target
        // Goal
        // Keeper saves
        // Blocked my defender
      // shot off target
        // Goal kick
        // Deflected -> Corner kick
  }
}
