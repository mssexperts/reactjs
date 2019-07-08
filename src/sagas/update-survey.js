import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { UPDATE_SURVEY_DATA, updateSurveyDataActionFailure, updateSurveyDataActionSuccess } from '../actions/survey-action-types';
import { LOGIN_SERVICE_URL } from '../constants';
import Utils from '../utils';
import User from '../utils/user';

const { httpHelper: { putRequest } } = new Utils().getAll();
const {
  userInfo, removeUserDetailsToken,
} = new User();

export function* updateSurveyData({ payload }) {
  const { accessToken } = userInfo();

  const {
    surveyId,
    updateSurveyDetails: {
      isFileContainHeader, surveyFileName,
    },
  } = payload;

  const payloadData = {
    data: {
      isFileContainHeader,
      surveyFileName,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/surveys/${surveyId}`,
  };

  const {
    error, status,
  } = yield call(putRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 204 && !error) {
    yield put(updateSurveyDataActionFailure(''));
    yield put(updateSurveyDataActionSuccess());
  } else if (error) {
    yield put(updateSurveyDataActionFailure(error.response.data));
  }
}

function* UpdateSurvey() {
  yield [takeLatest(UPDATE_SURVEY_DATA, updateSurveyData)];
}

export default UpdateSurvey;
