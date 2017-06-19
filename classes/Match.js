import Simulator from '../classes/Simulator';

var home = {
  name: 'United',
  gk: 50,
  defence: {
    passing: 50,
    technique: 50,
    positioning: 50,
    tackling: 50
  },
  midfield: {
    passing: 50,
    technique: 50,
    positioning: 50,
    tackling: 50
  },
  offence: {
    passing: 50,
    technique: 50,
    positioning: 50,
    tackling: 50
  },
  formation: [4,4,2]
};

var away = {
  name: 'City',
  gk: 50,
  defence: {
    passing: 50,
    technique: 50,
    positioning: 50,
    tackling: 50
  },
  midfield: {
    passing: 50,
    technique: 50,
    positioning: 50,
    tackling: 50
  },
  offence: {
    passing: 50,
    technique: 50,
    positioning: 50,
    tackling: 50
  },
  formation: [4,4,2]
};

const TEAMS = {
  0: home,
  1: away
};

export class Match {

  constructor() {
    this.simulator = new Simulator(home, away);
  }

  simulate() {
    //for(var i = 0; i < 10; i++) {
      const matchReport = this.simulator.simulateMatch();

      console.log(matchReport);
    //}

  }



}
