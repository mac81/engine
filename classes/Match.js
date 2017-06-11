import weighted from 'weighted';
import colors from 'colors';

//import {GoalkeeperEvents} from '../events/goalkeeper';

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

const GOALKEEPER_EVENTS = {
  0: 'throw',
  1: 'kick'
};

const DEFENCE_EVENTS = {
  0: 'shortpass',
  1: 'longpass',
  2: 'header'
};

const MIDFIELD_EVENTS = {
  0: 'shortpass',
  1: 'longpass',
  2: 'dribble',
  3: 'header'
};

const ATTACK_EVENTS = {
  0: 'shortpass',
  1: 'dribble',
  2: 'shot',
  3: 'header'
};

export default class Match {

  constructor() {
    this.teamInPossesion = 0;
    this.ballAtSection = 2;

    //this.goalkeeperEvents = new GoalkeeperEvents();
  }

  setTeamInPossesion(teamId) {
    this.teamInPossesion = teamId;
  }

  getTeamInPossesion() {
    return this.teamInPossesion;
  }

  setBallPosition(newPos) {
    this.ballAtSection = newPos;
  }

  getBallPosition() {
    return this.ballAtSection;
  }

  kickoff() {
    const teamInPossesion = this.getTeamInPossesion();
    const attackingTeam = teamInPossesion === 0 ? TEAMS[0] : TEAMS[1];
    return `${attackingTeam.name} to kickoff`;
  }

  generateEvent(eventType) {

    if(eventType === 'kickoff') {
      return this.kickoff();
    }

    const ballPosition = this.getBallPosition();
    const teamInPossesion = this.getTeamInPossesion();

    switch(ballPosition) {
    case 0:
    case 4:
      return this.goalkeeperEvents();
    case 1:
      return teamInPossesion === 0 ? this.defence() : this.attack();
    case 2:
      return this.midfield();
    case 3:
      return teamInPossesion === 0 ? this.attack() : this.defence();
    }
  }

  goalkeeperEvents() {
    const eventId = Math.floor(Math.random() * 2) + 1;
    const event = GOALKEEPER_EVENTS[eventId];

    switch(event) {
    case 'throw':
      return this.doShortpass();
    case 'kick':
      return this.doShortpass();
    }
  }

  defence() {
    const defEvent = 'shortpass'//MIDFIELD_EVENTS[eventId];

    switch(defEvent) {
    case 'shortpass':
      return this.doShortpass();
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

  midfield() {
    const eventId = Math.floor(Math.random() * 4) + 1;
    const midEvent = 'shortpass'//MIDFIELD_EVENTS[eventId];

    switch(midEvent) {
    case 'shortpass':
      return this.doShortpass();
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

  attack() {
    const eventId = Math.floor(Math.random() * 4) + 1;
    const attEvent = 'shot'//ATTACK_EVENTS[eventId];

    switch(attEvent) {
    case 'shortpass':
      this.doShortpass();
      break;
    case 'dribble':
      console.log('dribble');
      break;
    case 'shot':
      return this.doShot();
      break;
    case 'header':
      console.log('header');
      break;
    }
  }

  doShortpass() {
    const teamInPossesion = this.getTeamInPossesion();
    const ballPos = this.getBallPosition();

    const attackingTeam = teamInPossesion === 0 ? TEAMS[0] : TEAMS[1];
    const defendingTeam = teamInPossesion === 0 ? TEAMS[1] : TEAMS[0];

    if(ballPos === 0 || ballPos === 4) {
      this.setBallPosition(2);
      return `${attackingTeam.name}'s goalkeeper makes a successful pass to another teammember`;
    }

    const attackStatPoints = attackingTeam.formation[1] + attackingTeam.formation[2];
    const passTo = Math.floor(Math.random() * attackStatPoints) + 1;

    if(passTo <= 4) {
      console.log(`${attackingTeam.name} tries a pass to another midfielder`);

      const attackProbability = attackingTeam.mid + Math.floor(Math.random() * 20) + 1;
      const defenceProbability = defendingTeam.mid + Math.floor(Math.random() * 10) + 1;

      if(attackProbability > defenceProbability) {
        return `${attackingTeam.name} makes a successful pass to another midfielder`;
      } else {
        this.setTeamInPossesion(teamInPossesion === 0 ? 1 : 0);
        return `${defendingTeam.name} intercepts the pass`;
      }

    } else {
      console.log(`${attackingTeam.name} tries a pass to an attacker`);

      const attackProbability = attackingTeam.mid + attackingTeam.att + Math.floor(Math.random() * 10) + 1;
      const defenceProbability = defendingTeam.def + defendingTeam.mid + Math.floor(Math.random() * 10) + 1;

      if(attackProbability > defenceProbability) {
        this.setBallPosition(teamInPossesion === 0 ? 3 : 1);
        return `${attackingTeam.name} makes a successful pass to an attacker`;
      } else {
        //TODO: determine if defence or midfield intercepts pass and set section accordingly
        this.setTeamInPossesion(teamInPossesion === 0 ? 1 : 0);
        return `${defendingTeam.name} intercepts the pass`;
      }
    }

    // get formation
    // pick midfield + attack
    // try to pass
    // if pass to midfield calculate midfield skills vs midfield skills
    // if pass to attack calculate midfield skills vs defence skills
    // if success to midfield end event
    // if success to attack update ballAtSection
    // if fail to midfield update ballAtTeam
    // if fail to attack update ballAtTeam and ballAtSection
  }

  doShot() {
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
        'saved': 0,
        'blocked': 0
      };

      const onTargetOutcome = weighted.select(onTargetOptions);

      if(onTargetOutcome === 'saved') {
        this.setBallPosition(teamInPossesion === 0 ? 0 : 4);
        this.setTeamInPossesion(teamInPossesion === 0 ? 1 : 0);
      }

      if(onTargetOutcome === 'goal') {
        this.setBallPosition(2);
        this.setTeamInPossesion(teamInPossesion === 0 ? 1 : 0);
      }

      return onTargetOutcome;
    } else {
      const offTargetOptions = {
        'goalkick': 1,
        'deflected': 0
      };

      const offTargetOutcome = weighted.select(offTargetOptions);

      if(offTargetOutcome === 'goalkick') {
        this.setBallPosition(teamInPossesion === 0 ? 0 : 4);
        this.setTeamInPossesion(teamInPossesion === 0 ? 1 : 0);
      }

      return offTargetOutcome;
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

  simulate() {
    let event;

    for(let min = 0; min <= 15; min++ ) {
      console.log(`#### ${min} ####`.magenta);
      if(min === 0 || event === 'goal') {
        event = this.generateEvent('kickoff');
        console.log(event);
        continue;
      }

      event = this.generateEvent();
      event === 'goal' ? console.log(colors.rainbow(event.toUpperCase())) : console.log(event);
    }
  }

}
