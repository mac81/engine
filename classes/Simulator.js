//import {GoalkeeperEvents} from '../events/Goalkeeper';
//import {DefenceEvents} from '../events/Defence';
import {MidfieldEvents} from '../events/Midfield';
//import {OffenceEvents} from '../events/Offence';

/* Zones
| GK | DEF | MID | OFF | GK |
| 0  |  1  |  2  |  3  | 4  |
*/

export default class Simulator {

  constructor() {
    this.teamInPossesion = 0;
    this.ballAtZone = 2;

    //this.goalkeeperEvents = new GoalkeeperEvents();
    //this.defenceEvents = new DefenceEvents();
    this.midfieldEvents = new MidfieldEvents();
    //this.offenceEvents = new OffenceEvents();
  }

  setTeamInPossesion() {
    const newTeamInPossesion = this.getTeamInPossesion() === 0 ? 1 : 0;
    this.teamInPossesion = newTeamInPossesion;
  }

  getTeamInPossesion() {
    return this.teamInPossesion;
  }

  setBallPosition(zone) {
    this.ballAtZone = zone;
  }

  getBallPosition() {
    return this.ballAtZone;
  }

  simulateEvent() {
    const ballPosition = this.getBallPosition();
    const teamInPossesion = this.getTeamInPossesion();

    switch(ballPosition) {
      case 0:
      case 4:
        //this.simulateGoalkeeperEvent();
        break;
      case 1:
        break;
      case 2:
        return this.simulateMidfieldEvent();
      case 3:
        break;
    }
  }

  eventHandler(event) {
    const {eventType} = event;

    switch(eventType) {
      case 'passToMidfieldFailed':
        this.setTeamInPossesion();
        break;
      case 'passToMidfieldSucceded':
        break;
      case 'passToOffenceFailed':
        this.setBallPosition(this.getTeamInPossesion() === 0 ? 3 : 1);
        this.setTeamInPossesion();
        break;
      case 'passToOffenceSucceded':
        this.setBallPosition(this.getTeamInPossesion() === 0 ? 3 : 1);
        break;
      case 'goal':
        this.setBallPosition(2);
        this.setTeamInPossesion();
        break;
      case 'goalkick':
        this.setBallPosition(this.getTeamInPossesion() === 0 ? 4 : 0);
        this.setTeamInPossesion();
        break;
    }

    return event;
  }

  simulateMidfieldEvent() {
    return this.eventHandler(this.midfieldEvents.events());
  }

}
