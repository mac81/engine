import i18next from 'i18next';
import weighted from 'weighted';
import colors from 'colors';

import {GoalkeeperEvents} from '../events/Goalkeeper';
import {DefenceEvents} from '../events/Defence';
import {MidfieldEvents} from '../events/Midfield';
import {OffenceEvents} from '../events/Offence';

/* Zones
| GK | DEF | MID | OFF | GK |
| 0  |  1  |  2  |  3  | 4  |
*/

/* Pass
{
  teams: {
    attempt: attackingTeam,
    opponent: defendingTeam
  },
  attempt: {
    type: 'shortpass',
    from: 'defence/midfield/offence',
    to: 'defence/midfield/offence'
  },
  result: {
    type: 'success/failure/intercepted',  //failure.. really bad = throw in/corner, semi bad = intercepted or teammate rescues
    switchTeams: true/false
  }
}
*/

/* Shot
 {
   teams: {
     attempt: attackingTeam,
     opponent: defendingTeam
   },
   attempt: {
     type: 'shot',
     from: 'offence',
     to: 'offence', (Needed?)
     meta: 'on-target/off-target
   },
   result: {
     type: 'goal/save/goalkick',
     switchTeams: true/false
   }
 }
 */

export default class Simulator {

  constructor(home, away) {
    this.teamInPossesion = 0;
    this.ballAtZone = 2;
    this.hometeam = home;
    this.awayteam = away;

    this.goalkeeperEvents = new GoalkeeperEvents(home, away);
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

  simulateMatch() {
    let event;
    const eventMessages = [];

    for(let min = 0; min <= 15; min++ ) {
      event = this.simulateEvent(event);

      console.log(`#${min} # : `, event);

      // eventMessages.push({
      //   time: `#### ${min} ####`,
      //   attempt: i18next.t(`${event.attempt.type}.${event.attempt.target}.attempt`, {
      //     attackingTeam: event.teams.attempt.name,
      //     defendingTeam: event.teams.opponent.name
      //   }),
      //   result: i18next.t(`${event.attempt.type}.${event.attempt.target}.${event.result.type}`, {
      //     attackingTeam: event.teams.attempt.name,
      //     defendingTeam: event.teams.opponent.name
      //   })
      //   //result: i18next.t(`${event.attempt.type}.${event.attempt.target}.${event.result.type}`, { team: event.result.switchTeams ? event.teams.opponent.name : event.teams.attempt.name })
      // });

      event = this.eventHandler(event);
    }

    return eventMessages;
  }

  simulateEvent() {
    const ballPosition = this.getBallPosition();
    const teamInPossesion = this.getTeamInPossesion();

    switch(ballPosition) {
      case 0:
      case 4:
        return this.goalkeeperEvents.simulate(teamInPossesion);
        break;
      case 1:
        if(teamInPossesion === 0) {
          return this.defenceEvents.simulate(teamInPossesion);
        } else {
          return this.offenceEvents.simulate(teamInPossesion);
        }
      case 2:
        return this.midfieldEvents.simulate(teamInPossesion);
      case 3:
        if(teamInPossesion === 0) {
          return this.offenceEvents.simulate(teamInPossesion);
        } else {
          return this.defenceEvents.simulate(teamInPossesion);
        }
    }
  }

  eventHandler(event) {
    if(event.result.switchTeams) {
      this.setTeamInPossesion();
    }

    switch(event.result.type) {
      case 'shortpassToMidfieldFailed':
      case 'shortpassToMidfieldIntercepted':

        break;
      case 'shortpassToMidfieldSucceded':
        this.setBallPosition(2);
        break;
      case 'shortpassToOffenceIntercepted':
        this.setBallPosition(this.getTeamInPossesion() === 0 ? 3 : 1);
        break;

      case 'shortpassToOffenceSucceded':
        this.setBallPosition(this.getTeamInPossesion() === 0 ? 3 : 1);
        break;
      case 'goal':
        this.setBallPosition(2);
        break;
      case 'goalkick':
        this.setBallPosition(this.getTeamInPossesion() === 0 ? 4 : 0);
        break;
    }

    return event;
  }

}
