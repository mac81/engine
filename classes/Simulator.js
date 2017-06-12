//import {GoalkeeperEvents} from '../events/Goalkeeper';
import {DefenceEvents} from '../events/Defence';
import {MidfieldEvents} from '../events/Midfield';
import {OffenceEvents} from '../events/Offence';

/* Zones
| GK | DEF | MID | OFF | GK |
| 0  |  1  |  2  |  3  | 4  |
*/

export default class Simulator {

  constructor(home, away) {
    this.teamInPossesion = 0;
    this.ballAtZone = 2;
    this.hometeam = home;
    this.awayteam = away;

    //this.goalkeeperEvents = new GoalkeeperEvents();
    this.defenceEvents = new DefenceEvents(home, away);
    this.midfieldEvents = new MidfieldEvents(home, away);
    this.offenceEvents = new OffenceEvents(home, away);
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
        return this.eventHandler(this.defenceEvents.simulate(teamInPossesion));
        break;
      case 1:
        if(teamInPossesion === 0) {
          return this.eventHandler(this.defenceEvents.simulate(teamInPossesion));
        } else {
          return this.eventHandler(this.offenceEvents.simulate(teamInPossesion));
        }
      case 2:
        return this.eventHandler(this.midfieldEvents.simulate(teamInPossesion));
      case 3:
        if(teamInPossesion === 0) {
          return this.eventHandler(this.offenceEvents.simulate(teamInPossesion));
        } else {
          return this.eventHandler(this.defenceEvents.simulate(teamInPossesion));
        }
    }
  }

  eventHandler(event) {
    switch(event.eventType) {
      case 'shortpassToMidfieldFailed':
      case 'shortpassToMidfieldIntercepted':
        this.setTeamInPossesion();
        break;
      case 'shortpassToMidfieldSucceded':
        this.setBallPosition(2);
        break;
      case 'shortpassToOffenceIntercepted':
        this.setBallPosition(this.getTeamInPossesion() === 0 ? 3 : 1);
        this.setTeamInPossesion();
        break;

      case 'shortpassToOffenceSucceded':
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

}
