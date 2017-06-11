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

export class Match extends Simulator {

  constructor() {
    super();

    // this.goalkeeperEvents = new GoalkeeperEvents();
    // this.defenceEvents = new DefenceEvents();
    // this.midfieldEvents = new MidfieldEvents();
    // this.offenceEvents = new OffenceEvents();
  }

  // kickoff() {
  //   const teamInPossesion = this.getTeamInPossesion();
  //   const attackingTeam = teamInPossesion === 0 ? TEAMS[0] : TEAMS[1];
  //   return `${attackingTeam.name} to kickoff`;
  // }

  generateEvent(eventType) {

    // if(eventType === 'kickoff') {
    //   return this.kickoff();
    // }

    // console.log(this.getBallPosition());
    // this.setBallPosition(3);
    // console.log(this.getBallPosition());

    // console.log('generating event');
    //
    // const events = [];
    // events.push(this.goalkeeperEvents.events());
    // events.push(this.defenceEvents.events());
    // events.push(this.midfieldEvents.events());
    // events.push(this.offenceEvents.events());
    // return events;

    // const ballPosition = this.getBallPosition();
    // console.log(ballPosition);
    // const teamInPossesion = this.getTeamInPossesion();
    //
    // console.log('getting zone from match: ', super.getBallPosition());

    // console.log('ballPosition: ', this.getBallPosition());
    // console.log('setting ballPosition 1');
    // this.setBallPosition(1);
    // console.log('ballPosition: ', this.getBallPosition());
    // console.log('setting ballPosition 3');
    // this.setBallPosition(3);
    // console.log('ballPosition: ', this.getBallPosition());

    // switch(ballPosition) {
    // case 0:
    // case 4:
    // console.log('gk');
    // break;
    //   //return this.goalkeeperEvents.events();
    // case 1:
    // console.log('def');
    // break;
    //   //return teamInPossesion === 0 ? this.defenceEvents.events() : this.offenceEvents.events();
    // case 2:
    //   return this.eventHandler(this.midfieldEvents.events());
    //   //return this.midfieldEvents.events().eventMessage;
    // case 3:
    //   return this.eventHandler(this.offenceEvents.events());
    //   //return teamInPossesion === 0 ? this.offenceEvents.events() : this.defenceEvents.events();
    // }
  }
  //
  // goalkeeperEvents() {
  //   const eventId = Math.floor(Math.random() * 2) + 1;
  //   const event = GOALKEEPER_EVENTS[eventId];
  //
  //   switch(event) {
  //   case 'throw':
  //     return this.doShortpass();
  //   case 'kick':
  //     return this.doShortpass();
  //   }
  // }
  //
  // defence() {
  //   const defEvent = 'shortpass'//MIDFIELD_EVENTS[eventId];
  //
  //   switch(defEvent) {
  //   case 'shortpass':
  //     return this.doShortpass();
  //   case 'longpass':
  //     console.log('long ball');
  //     break;
  //   case 'dribble':
  //     console.log('dribble');
  //     break;
  //   case 'header':
  //     console.log('header');
  //     break;
  //   }
  // }
  //

  simulate() {
    let event;

    for(let min = 0; min <= 15; min++ ) {
      console.log(`#### ${min} ####`.magenta);
      // if(min === 0 || event === 'goal') {
      //   event = this.generateEvent('kickoff');
      //   console.log(event);
      //   continue;
      // }

      event = this.simulateEvent();
      console.log('Event: ', event);
      //event === 'goal' ? console.log(colors.rainbow(event.toUpperCase())) : console.log(event);
    }
  }

}
