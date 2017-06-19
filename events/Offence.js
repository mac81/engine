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

  getAttackingTeam() {
    return this.teamInPossesion === 0 ? this.hometeam : this.awayteam;
  }

  getDefendingTeam() {
    return this.teamInPossesion === 0 ? this.awayteam : this.hometeam;
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
    const attackingTeam = this.getAttackingTeam();
    const defendingTeam = this.getDefendingTeam();

    const shotOptions = {
      'on-target': 0.5,
      'off-target': 0.5
    };

    const shotOutcome = weighted.select(shotOptions);

    let resultOptions;

    if(shotOutcome === 'on-target') {
      resultOptions = {
        'goal': 1,
        'save': 0
      };
    } else {
      resultOptions = {
        'goalkick': 1
      };
    }

    const resultOutcome = weighted.select(resultOptions);
    const switchTeams = resultOptions === 'goalkick' ? true : false;

    return {
      teams: {
        attempt: attackingTeam,
        opponent: defendingTeam
      },
      attempt: {
        type: 'shot',
        target: 'offence',
        result: shotOutcome
      },
      result: {
        type: resultOutcome,
        switchTeams: switchTeams
      }
    }

    // } else {
    //   const offTargetOptions = {
    //     'goalkick': 1
    //   };
    //
    //   const offTargetOutcome = weighted.select(offTargetOptions);
    //
    //   return {
    //     attempt: {
    //       team: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
    //       type: 'shot',
    //       result: shotOutcome
    //     },
    //     result: offTargetOutcome,
    //     attemptTeam: this.teamInPossesion === 0 ? this.hometeam : this.awayteam,
    //     resultTeam: this.teamInPossesion === 0 ? this.awayteam : this.hometeam,
    //     attemptType: 'shot',
    //     eventType: offTargetOutcome
    //   }
    // }

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
