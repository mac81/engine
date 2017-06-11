import Simulator from '../classes/Simulator';

import weighted from 'weighted';
import colors from 'colors';

var home = {
  name: 'United',
  gk: 50,
  def: 50,
  mid: 50,
  att: 50,
  formation: [4,4,2]
};

var away = {
  name: 'City',
  gk: 50,
  def: 50,
  mid: 50,
  att: 50,
  formation: [4,4,2]
};

const TEAMS = {
  0: home,
  1: away
};

export class OffenceEvents extends Simulator {

  constructor() {
    super();
  }

  events() {
    //const teamInPossesion = this.getTeamInPossesion();
    //const ballPos = this.getBallPosition();

    const eventId = Math.floor(Math.random() * 4) + 1;
    const attEvent = 'shot'//ATTACK_EVENTS[eventId];

    switch(attEvent) {
    case 'shortpass':
      console.log('shortpass');
      break;
    case 'dribble':
      console.log('dribble');
      break;
    case 'shot':
      return this.shot();
      break;
    case 'header':
      console.log('header');
      break;
    }
  }

  shot() {
    const teamInPossesion = this.getTeamInPossesion();
    const attackingTeam = teamInPossesion === 0 ? TEAMS[0] : TEAMS[1];
    const defendingTeam = teamInPossesion === 0 ? TEAMS[1] : TEAMS[0];
    // get attackers
    // try shot

    console.log(`${attackingTeam.name} tries to shoot`);

    const shotOptions = {
      'on-target': 0.5,
      'off-target': 0.5
    };

    const shotOutcome = weighted.select(shotOptions);

    console.log(`${attackingTeam.name} shoots ${shotOutcome}`);

    if(shotOutcome === 'on-target') {
      const onTargetOptions = {
        'goal': 1,
        'shotSaved': 0,
        'shotBlocked': 0
      };

      const onTargetOutcome = weighted.select(onTargetOptions);

      return {
        eventType: onTargetOutcome,
        eventMessage: ''
      }

      // if(onTargetOutcome === 'saved') {
      //
      //   //this.setBallPosition(teamInPossesion === 0 ? 0 : 4);
      //   //this.setTeamInPossesion(teamInPossesion === 0 ? 1 : 0);
      // }
      //
      // if(onTargetOutcome === 'goal') {
      //   this.setBallPosition(2);
      //   this.setTeamInPossesion(teamInPossesion === 0 ? 1 : 0);
      // }
      //
      // return onTargetOutcome;
    } else {
      const offTargetOptions = {
        'goalkick': 1,
        'shotDeflected': 0
      };

      const offTargetOutcome = weighted.select(offTargetOptions);

      return {
        eventType: offTargetOutcome,
        eventMessage: ''
      }

      // if(offTargetOutcome === 'goalkick') {
      //   this.setBallPosition(teamInPossesion === 0 ? 0 : 4);
      //   this.setTeamInPossesion(teamInPossesion === 0 ? 1 : 0);
      // }
      //
      // return offTargetOutcome;
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
