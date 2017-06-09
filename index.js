var weighted = require('weighted');

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

const ATTACK_EVENTS = {
  0: 'shortpass',
  1: 'dribble',
  2: 'shot',
  3: 'header'
};

class Engine {

  constructor() {
    this.time = 0;
    this.ballAtTeam = 0;
    this.ballAtSection = 2;
  }

  setBallAtTeam(teamId) {
    this.ballAtTeam = teamId;
  }

  getBallAtTeam() {
    return this.ballAtTeam;
  }

  setBallPosition() {
    const currentPosition = this.getBallPosition();
    const currentBallAtTeam = this.getBallAtTeam();
    const newBallPosition = currentBallAtTeam === 0 ? 3 : 1;

    this.ballAtSection = newBallPosition;
  }

  getBallPosition() {
    return this.ballAtSection;
  }

  kickoff(min) {
    console.log(min, ' kickoff')
  }

  goalkeeper() {
    console.log('goalkeeper')
  }

  defence() {
    console.log('defence')
  }

  midfield() {
    const eventId = Math.floor(Math.random() * 4) + 1;
    const midEvent = 'shortpass'//MIDFIELD_EVENTS[eventId];

    switch(midEvent) {
    case 'shortpass':
      this.doShortpass();
      break;
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
      this.doShot();
      break;
    case 'header':
      console.log('header');
      break;
    }
  }

  event(min) {
    const ballPos = this.getBallPosition();
    const teamInPossesion = this.getBallAtTeam();

    console.log(`#### ${min} ####`);

    switch(ballPos) {
    case 0:
      this.goalkeeper();
      break;
    case 1:
      teamInPossesion === 0 ? this.defence() : this.attack();
      break;
    case 2:
      this.midfield();
      break;
    case 3:
      teamInPossesion === 0 ? this.attack() : this.defence();
      break;
    }

    console.log('-------------');
  }

  doShortpass() {
    const ballAtTeam = this.getBallAtTeam();

    const attackingTeam = ballAtTeam === 0 ? TEAMS[0] : TEAMS[1];
    const defendingTeam = ballAtTeam === 0 ? TEAMS[1] : TEAMS[0];

    const attackStatPoints = attackingTeam.formation[1] + attackingTeam.formation[2];
    const passTo = Math.floor(Math.random() * attackStatPoints) + 1;

    if(passTo <= 4) {
      console.log(`${attackingTeam.name} tries a pass to another midfielder`);

      const attackProbability = attackingTeam.mid + Math.floor(Math.random() * 20) + 1;
      const defenceProbability = defendingTeam.mid + Math.floor(Math.random() * 10) + 1;

      if(attackProbability > defenceProbability) {
        console.log(`${attackingTeam.name} makes a successful pass`);
      } else {
        console.log(`${defendingTeam.name} intercepts the pass`);
        this.setBallAtTeam(ballAtTeam === 0 ? 1 : 0);
      }

    } else {
      console.log(`${attackingTeam.name} tries a pass to an attacker`);

      const attackProbability = attackingTeam.mid + attackingTeam.att + Math.floor(Math.random() * 10) + 1;
      const defenceProbability = defendingTeam.def + defendingTeam.mid + Math.floor(Math.random() * 10) + 1;

      if(attackProbability > defenceProbability) {
        console.log(`${attackingTeam.name} makes a successful pass`);
        this.setBallPosition();
      } else {
        console.log(`${defendingTeam.name} intercepts the pass`);
        //TODO: determine if defence or midfield intercepts pass and set section accordingly
        this.setBallAtTeam(ballAtTeam === 0 ? 1 : 0);
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
    // get attackers
    // try shot

    const shotOptions = {
      'on-target': 0.5,
      'off-target': 0.5
    };

    const shotOutcome = weighted.select(shotOptions);

    if(shotOutcome === 'on-target') {
      const onTargetOptions = {
        'goal': 0.5,
        'save': 0.5,
        'blocked': 0.2
      };

      const onTargetOutcome = weighted.select(onTargetOptions);

      console.log(onTargetOutcome);
    } else {
      const offTargetOptions = {
        'goalkick': 0.7,
        'deflected': 0.3
      };

      const offTargetOutcome = weighted.select(offTargetOptions);

      console.log(offTargetOutcome);
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
    for(let min = 0; min <= 90; min++ ) {
      switch(min) {
      case 0:
      case 45:
        this.kickoff(min);
        break;

      default:
        this.event(min);
      }
    }
  }
}

const game = new Engine();
game.simulate();

