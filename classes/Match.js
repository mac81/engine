import Simulator from '../classes/Simulator';


var home = {
  name: 'United',
  gk: 50,
  defence: {
    passing: 50,
    technique: 50,
    positioning: 50
  },
  midfield: {
    passing: 50,
    technique: 50,
    positioning: 50
  },
  offence: {
    passing: 50,
    technique: 50,
    positioning: 50
  },
  formation: [4,4,2]
};

var away = {
  name: 'City',
  gk: 50,
  defence: {
    passing: 50,
    technique: 50,
    positioning: 50
  },
  midfield: {
    passing: 50,
    technique: 50,
    positioning: 50
  },
  offence: {
    passing: 50,
    technique: 50,
    positioning: 50
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

  // kickoff() {
  //   const teamInPossesion = this.getTeamInPossesion();
  //   const attackingTeam = teamInPossesion === 0 ? TEAMS[0] : TEAMS[1];
  //   return `${attackingTeam.name} to kickoff`;
  // }

  simulate() {
    const matchReport = this.simulator.simulateMatch();

    console.log(matchReport);
    // let event;
    //
    // for(let min = 0; min <= 15; min++ ) {
    //   console.log(`#### ${min} ####`.magenta);
    //   // if(min === 0 || event === 'goal') {
    //   //   event = this.generateEvent('kickoff');
    //   //   console.log(event);
    //   //   continue;
    //   // }
    //
    //   event = this.simulator.simulateEvent(event);
    //   const eventMessages = this.messageHandler(event);
    //
    //   //console.log(event);
    //
    //   eventMessages.forEach(function(message) {
    //     console.log(message);
    //   });
    //   //event === 'goal' ? console.log(colors.rainbow(event.toUpperCase())) : console.log(event);
    // }
  }



}
