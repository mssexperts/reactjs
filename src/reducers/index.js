import { combineReducers } from 'redux';
import crosstab from './crosstab';
import login from './user-authentication';
import manageUsers from './manage-users';
import newSurvey from './new-survey';
import updateSurvey from './update-survey';
import notification from './notification';
import enterprise from './enterprise';
import locale from './locale';

const reducers = combineReducers({
  crosstab,
  enterprise,
  locale,
  login,
  manageUsers,
  newSurvey,
  notification,
  updateSurvey,
});

export default reducers;
