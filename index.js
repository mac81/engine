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

class Engine {

  constructor() {
    this.ballAtTeam = 0;
    this.ballAtSection = 2;
  }

  setBallAtTeam(teamId) {
    this.ballAtTeam = teamId;
  }

  getBallAtTeam() {
    return this.ballAtTeam;
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
    console.log('attack')
  }

  event(min) {
    const ballPos = this.getBallPosition();

    console.log(`#### ${min} ####`);

    switch(ballPos) {
    case 0:
      this.goalkeeper();
      break;
    case 1:
      this.defence();
      break;
    case 2:
      this.midfield();
      break;
    case 3:
      this.attack();
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
      // do attack pass
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

