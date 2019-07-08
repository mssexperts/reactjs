import languages from './languages';
import User from '../utils/user';

const { defaultLanguage } = new User();

const selectLanguage = languages[defaultLanguage()];

const initialState = { ...selectLanguage };

const locale = (state = initialState, {
  type, payload,
}) => {
  const data = languages[payload];

  switch (type) {
    case 'SELECT_LOCALE':
      switch (payload) {
        case 'fr':
          return {
            ...initialState,
            ...data,
          };
        default:
          return {
            ...initialState,
            ...data,
          };
      }
    default:
      return state;
  }
};

export default locale;
