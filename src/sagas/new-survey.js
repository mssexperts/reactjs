import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CHECK_SURVEY_CODE,
  checkSurveyCodeRequested,
  checkSurveyCodeSuccess,
  checkSurveyCodeFailure,
  CREATE_NEW_SURVEY,
  createNewSurveySuccess,
  createNewSurveyFailure,
  FETCH_SURVEY_LIST,
  fetchSurveyListRequested,
  fetchSurveyListSuccess,
  FETCH_SURVEY_ACTIVITY_LIST,
  fetchSurveyActivityListRequested,
  fetchSurveyActivityListSuccess,
  CREATE_NEW_CROSSTAB,
  createNewCrosstabRequested,
  createNewCrosstabSuccess,
  createNewCrosstabFailure,
  OPEN_CROSSTAB_ACTION,
  DELETE_SURVEY,
  deleteSurveySuccess,
  DELETE_CROSSTAB,
} from '../actions/survey-action-types';
import { notificationRequested } from '../actions/notification-action-types';
import { updateTreeDetails } from '../actions/crosstab-action-types';
import { LOGIN_SERVICE_URL } from '../constants';
import Utils from '../utils';
import User from '../utils/user';
import Storage from '../utils/storage';

const {
  httpHelper: {
    deleteRequest, getRequest, postRequest,
  },
} = new Utils().getAll();

const {
  userInfo, removeUserDetailsToken,
} = new User();

export const getSurveyDetails = (state) => state.surveyDetails;

export function* checkSurveyCode({ payload }) {
  const { accessToken } = userInfo();

  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/Surveys/isSurveyCodeExists/${payload}`,
  };

  yield put(checkSurveyCodeRequested());

  const {
    error, status, data,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    yield put(checkSurveyCodeSuccess(data));
  } else {
    yield put(checkSurveyCodeFailure(true));
  }
}

export function* createNewSurvey({ payload }) {
  const { accessToken } = userInfo();

  const payloadData = {
    data: { ...payload },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/surveys`,
  };

  const {
    error, status, data,
  } = yield call(postRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    yield put(createNewSurveyFailure(''));
    yield put(createNewSurveySuccess(data));

    yield put(push('/'));
  } else if (error) {
    yield put(createNewSurveyFailure(error.response.data.description || error.response.data.details[0].message));
  }
}

export function* fetchSurveyList({ payload }) {
  const { accessToken } = userInfo();

  const payloadData = {
    data: { ...payload },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/surveys/surveylistbyusers`,
  };

  yield put(fetchSurveyListRequested());

  const {
    error, status, data,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    const surveyListArray = [];

    data.forEach((surveyNode) => {
      const checkSurveyInList = surveyListArray.filter((survey) => survey.surveyId === surveyNode.surveyId).length === 0;

      if (checkSurveyInList) {
        surveyListArray.push({
          code: surveyNode.code,
          createdAt: surveyNode.createdAt,
          crosstab: surveyNode.crosstabId
            ? [
              {
                columns: surveyNode.columns,
                crossTabId: surveyNode.crosstabId,
                filters: surveyNode.filters,
                rows: surveyNode.rows,
                surveyId: surveyNode.surveyId,
                title: surveyNode.crosstabName,
                userId: surveyNode.userId,
              },
            ]
            : [],
          description: surveyNode.description,
          name: surveyNode.name,
          respondents: surveyNode.respondents,
          surveyId: surveyNode.surveyId,
        });
      } else {
        const surveyOptions = surveyListArray.filter((survey) => survey.surveyId === surveyNode.surveyId);
        const crosstabData = surveyOptions[0].crosstab;

        crosstabData.push({
          columns: surveyNode.columns,
          crossTabId: surveyNode.crosstabId,
          filters: surveyNode.filters,
          rows: surveyNode.rows,
          surveyId: surveyNode.surveyId,
          title: surveyNode.crosstabName,
          userId: surveyNode.userId,
        });
      }
    });
    yield put(fetchSurveyListSuccess(surveyListArray));
  }
}

export function* fetchSurveyActivityList() {
  const { accessToken } = userInfo();

  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/surveys/surveyactivities`,
  };

  yield put(fetchSurveyActivityListRequested());

  const {
    status, data,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200) {
    yield put(fetchSurveyActivityListSuccess(data));
  }
}

export function* createNewCrosstab({ payload }) {
  const { accessToken } = userInfo();

  const payloadData = {
    data: {
      ...payload,
      columns: JSON.stringify([]),
      filters: JSON.stringify([]),
      rows: JSON.stringify([]),
      weight: JSON.stringify([]),
    },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/crosstabs`,
  };

  yield put(createNewCrosstabRequested());

  const {
    status, data, error,
  } = yield call(postRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200) {
    yield put(createNewCrosstabSuccess(data));

    yield put(updateTreeDetails({
      columns: [], filters: [], rows: [], weight: [],
    }));
    Storage.save('crosstab', data);
    yield put(push('/cross-tab'));
  } else if (status === 400) {
    yield put(createNewCrosstabFailure(error.response.data.details));
  } else {
    yield put(createNewCrosstabFailure([{ message: error.response.data.description }]));
  }
}

export function* openCrosstabAction({ payload }) {
  const { crosstab } = { ...payload };

  Storage.save('crosstab', crosstab);
  yield put(push('/cross-tab'));
}

export function* deleteSurvey({ payload }) {
  const {
    accessToken, companyId, userId,
  } = userInfo();

  const payloadData = {
    data: {
      companyId,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/surveys/${payload}`,
  };

  const {
    error, status,
  } = yield call(deleteRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 204 && !error) {
    yield put(deleteSurveySuccess(payload));
    yield put(
      notificationRequested({
        notificationMessage: 'successDeletedSurvey',
        notificationType: 'success',
      })
    );
  } else if (status === 400) {
    yield put(updateUserDetailsFailure(error.details.message));
    yield put(
      notificationRequested({
        notificationMessage: 'errorDeletedSurvey',
        notificationType: 'error',
      })
    );
  } 
}

export function* deleteCrosstab({ payload }) {
  const {
    accessToken, companyId, userId,
  } = userInfo();

  const payloadData = {
    data: {
      companyId,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/crosstabs/${payload}`,
  };

  const {
    error, status,
  } = yield call(deleteRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 204 && !error) {
    yield* fetchSurveyList({});
    yield put(
      notificationRequested({
        notificationMessage: 'successDeletedCrosstab',
        notificationType: 'success',
      })
    );
  } else if (status === 400) {
    yield put(updateUserDetailsFailure(error.details.message));
    yield put(
      notificationRequested({
        notificationMessage: 'errorDeletedCrosstab',
        notificationType: 'error',
      })
    );
  } 
}

function* NewSurvey() {
  yield [
    takeLatest(CHECK_SURVEY_CODE, checkSurveyCode),
    takeLatest(CREATE_NEW_SURVEY, createNewSurvey),
    takeLatest(FETCH_SURVEY_LIST, fetchSurveyList),
    takeLatest(FETCH_SURVEY_ACTIVITY_LIST, fetchSurveyActivityList),
    takeLatest(CREATE_NEW_CROSSTAB, createNewCrosstab),
    takeLatest(OPEN_CROSSTAB_ACTION, openCrosstabAction),
    takeLatest(DELETE_SURVEY, deleteSurvey),
    takeLatest(DELETE_CROSSTAB, deleteCrosstab)
  ];
}

export default NewSurvey;
