import {Match} from './classes/Match';
import i18next from 'i18next';
import eventMessages from './eventMessages';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: eventMessages
    }
  }
});

const match = new Match();
match.simulate();
