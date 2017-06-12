import Simulator from '../classes/Simulator';
import i18next from 'i18next';
import weighted from 'weighted';
import colors from 'colors';

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
//
// const GOALKEEPER_EVENTS = {
//   0: 'throw',
//   1: 'kick'
// };
//
// const DEFENCE_EVENTS = {
//   0: 'shortpass',
//   1: 'longpass',
//   2: 'header'
// };
//

//
// const ATTACK_EVENTS = {
//   0: 'shortpass',
//   1: 'dribble',
//   2: 'shot',
//   3: 'header'
// };
//console.log('import match');
// import {GoalkeeperEvents} from '../events/Goalkeeper';
// import {DefenceEvents} from '../events/Defence';
// import {MidfieldEvents} from '../events/Midfield';
// import {OffenceEvents} from '../events/Offence';

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
    let event;

    for(let min = 0; min <= 15; min++ ) {
      console.log(`#### ${min} ####`.magenta);
      // if(min === 0 || event === 'goal') {
      //   event = this.generateEvent('kickoff');
      //   console.log(event);
      //   continue;
      // }

      event = this.simulator.simulateEvent();
      const eventMessages = this.messageHandler(event);

      //console.log(event);

      eventMessages.forEach(function(message) {
        console.log(message);
      });
      //event === 'goal' ? console.log(colors.rainbow(event.toUpperCase())) : console.log(event);
    }
  }

  messageHandler(event) {
    const eventMessages = [];

    eventMessages.push(i18next.t(event.attemptType, { team: event.attemptTeam.name }));
    eventMessages.push(i18next.t(event.eventType, { team: event.resultTeam.name }));

    return eventMessages;
  }

}
