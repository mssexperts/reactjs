import Storage from './storage';
import en from '../reducers/languages/en';
import fr from '../reducers/languages/fr';

class Translate {
  static translate = (key) => {
    const language = Storage.get('language');

    if (language === 'en') {
      return en.messages[key];
    }
    if (language === 'fr') {
      return fr.messages[key];
    }

    return en.messages[key];
  };
}

export default Translate;
