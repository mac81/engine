//import Simulator from '../classes/Simulator';

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

const MIDFIELD_EVENTS = {
  0: 'shortpass',
  1: 'longpass',
  2: 'dribble',
  3: 'header'
};

export class MidfieldEvents {

  constructor() {
    //super();
  }

  events(teamInPossesion) {
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
    const teamInPossesion = this.teamInPossesion;
    //const ballPos = super.getBallPosition();

    const attackingTeam = teamInPossesion === 0 ? TEAMS[0] : TEAMS[1];
    const defendingTeam = teamInPossesion === 0 ? TEAMS[1] : TEAMS[0];

    // if(ballPos === 0 || ballPos === 4) {
    //   this.setBallPosition(2);
    //   return `${attackingTeam.name}'s goalkeeper makes a successful pass to another teammember`;
    // }

    const attackStatPoints = attackingTeam.formation[1] + attackingTeam.formation[2];
    const passTo = Math.floor(Math.random() * attackStatPoints) + 1;

    if(passTo <= 4) {
      console.log(`${attackingTeam.name} tries a pass to another midfielder`);

      const attackProbability = attackingTeam.mid + Math.floor(Math.random() * 20) + 1;
      const defenceProbability = defendingTeam.mid + Math.floor(Math.random() * 10) + 1;

      if(attackProbability > defenceProbability) {
        return {
          eventType: 'passToMidfieldSucceded',
          eventMessage: `${attackingTeam.name} makes a successful pass to another midfielder`
        }
        //return `${attackingTeam.name} makes a successful pass to another midfielder`;
      } else {
        return {
          eventType: 'passToMidfieldFailed',
          eventMessage: `${defendingTeam.name} intercepts the pass`
        }
        //this.setTeamInPossesion(teamInPossesion === 0 ? 1 : 0);
        //return `${defendingTeam.name} intercepts the pass`;
      }

    } else {
      console.log(`${attackingTeam.name} tries a pass to an attacker`);

      const attackProbability = attackingTeam.mid + attackingTeam.att + Math.floor(Math.random() * 10) + 1;
      const defenceProbability = defendingTeam.def + defendingTeam.mid + Math.floor(Math.random() * 10) + 1;

      if(attackProbability > defenceProbability) {
        //super.setBallPosition(teamInPossesion === 0 ? 3 : 1);
        return {
          eventType: 'passToOffenceSucceded',
          eventMessage: `${attackingTeam.name} makes a successful pass to an attacker`
        }
      } else {
        //TODO: determine if defence or midfield intercepts pass and set section accordingly
        //this.setTeamInPossesion(teamInPossesion === 0 ? 1 : 0);
        return {
          eventType: 'passToOffenceFailed',
          eventMessage: `${defendingTeam.name} intercepts the pass`
        }
        //return `${defendingTeam.name} intercepts the pass`;
      }
    }
  }
}
