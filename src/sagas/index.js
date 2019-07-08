import { all } from 'redux-saga/effects';
import crosstabSaga from './crosstab';
import loginSaga from './user-authentication';
import manageUsersSaga from './manage-users';
import notificationSaga from './notification';
import localeSaga from './locale';
import enterpriseSaga from './enterprise';
import newSurveySaga from './new-survey';
import updateSurveySaga from './update-survey';

const sagas = function* sagas() {
  yield all([crosstabSaga(), enterpriseSaga(), loginSaga(), manageUsersSaga(), notificationSaga(), localeSaga(), newSurveySaga(), updateSurveySaga()]);
};

export default sagas;
