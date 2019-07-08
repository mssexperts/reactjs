import { call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { fetchCrosstabAttributesRequested,
  fetchCrosstabAttributesSuccess,
  fetchCrosstabAttributesFailure,
  UPDATE_CROSSTAB,
  updateCrossTabRequested,
  updateCrossTabSuccess,
  updateCrossTabFailure,
  updateTreeDetails,
  FETCH_DICTIONARY,
  fetchDictionaryRequested,
  fetchDictionarySuccess,
  fetchDictionaryFailure,
  FETCH_CROSSTAB_ALL_REPORT,
  fetchCrosstabAllReportRequested,
  fetchCrosstabAllReportSuccess,
  fetchCrosstabAllReportFailure,
  updateCrossTabDetails,
  FETCH_REPORT_DISPLAY_SETTINGS,
  fetchReportDisplaySettingsRequested,
  fetchReportDisplaySettingsSuccess,
  fetchReportDisplaySettingsFailure,
  UPDATE_REPORT_DISPLAY_SETTINGS,
  updateReportDisplaySettingsSuccess,
  updateReportDisplaySettingsFailure } from '../actions/crosstab-action-types';
import User from '../utils/user';
import Utils from '../utils';
import { LOGIN_SERVICE_URL } from '../constants';
import Crosstab from '../utils/crosstab';
import Storage from '../utils/storage';

const {
  userInfo, removeUserDetailsToken,
} = new User();

const { crosstabInfo } = Crosstab;

const {
  getRowsAndColumnsCode, nodeTree,
} = new Crosstab();

const {
  httpHelper: {
    getRequest, patchRequest, postRequest,
  },
} = new Utils().getAll();

export function* fetchCrosstabAllReport(payload) {
  const { accessToken } = userInfo();
  const {
    crossTabId, tableData, sheetId, surveyId,
  } = crosstabInfo();

  const getItems = (state) => state;

  const {
    crosstab: {
      dictionary: dictionaryElements, treeDetails,
    },
  } = yield select(getItems);

  const {
    rows, columns, filters, weight,
  } = treeDetails;

  const treeNodes = nodeTree(dictionaryElements);

  const updatedCrossTabDetails = {
    attributeJson: JSON.stringify(treeDetails),
    calculate: payload.payload.calculate,
    columns: JSON.stringify(getRowsAndColumnsCode(columns, treeNodes)),
    crossTabId,
    filters: JSON.stringify(getRowsAndColumnsCode(filters, treeNodes)),
    rows: JSON.stringify(getRowsAndColumnsCode(rows, treeNodes)),
    sheetId,
    sourceTable: tableData,
    surveyId,
    weight: JSON.stringify(getRowsAndColumnsCode(weight, treeNodes)),
  };

  const payloadData = {
    data: updatedCrossTabDetails,
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/crosstabs/FetchAllCrosstabDetails`,
  };

  yield put(fetchCrosstabAllReportRequested());

  const {
    data, error, status,
  } = yield call(postRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    yield put(fetchCrosstabAllReportSuccess(data));
  } else {
    yield put(fetchCrosstabAllReportFailure(error));
  }
}

export function* fetchCrosstabAttributes() {
  const {
    companyId, accessToken,
  } = userInfo();

  const { crossTabId } = crosstabInfo();

  const payloadData = {
    data: { companyId },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/crosstabs/getcrosstabdata/${crossTabId}`,
  };

  yield put(fetchCrosstabAttributesRequested());

  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  const { attributeJson } = data;

  if (status === 200 && !error) {
    Storage.save('crosstab', data);

    if (attributeJson) {
      yield put(updateTreeDetails(JSON.parse(attributeJson)));
    }

    yield put(fetchCrosstabAttributesSuccess(data));

    yield* fetchCrosstabAllReport({ payload: { calcuate: false } });
    yield put(updateCrossTabDetails(data));
  } else {
    yield put(fetchCrosstabAttributesFailure(error));
  }
}

export function* updateCrossTab({ payload }) {
  const {
    companyId, accessToken,
  } = userInfo();
  const payloadData = {
    data: {
      ...payload,
      companyId,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/api/crosstab`,
  };

  yield put(updateCrossTabRequested());

  const {
    data, error, status,
  } = yield call(patchRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    yield put(updateCrossTabSuccess(data));
  } else {
    yield put(updateCrossTabFailure(error));
  }
}

export function* fetchDictionary() {
  const { accessToken } = userInfo();

  const { surveyId } = crosstabInfo();

  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/surveys/dictionaries/${surveyId}`,
  };

  yield put(fetchDictionaryRequested());

  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    yield put(fetchDictionarySuccess([data]));

    yield* fetchCrosstabAttributes();
  } else {
    yield put(fetchDictionaryFailure(error));
  }
}

export function* fetchReportDisplaySettings() {
  const { accessToken } = userInfo();

  const { crossTabId } = crosstabInfo();

  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/crosstabs/getreportdisplaysettings/${crossTabId}`,
  };

  yield put(fetchReportDisplaySettingsRequested());

  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    yield put(fetchReportDisplaySettingsSuccess(data));
  } else {
    yield put(fetchReportDisplaySettingsFailure(error));
  }
}

export function* updateReportDisplaySettings({ payload }) {
  const { accessToken } = userInfo();

  const { crossTabId } = crosstabInfo();
  const { weightFile } = JSON.parse(payload);
  const weight = JSON.stringify(weightFile);
  const data = {
    reportSettings: payload,
    weightFile: weight,
  };

  const payloadData = {
    data,
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/crosstabs/updatereportdisplaysettings/${crossTabId}`,
  };

  const { status } = yield call(patchRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 204) {
    yield put(updateReportDisplaySettingsSuccess());
    yield* fetchCrosstabAttributes();
  } else {
    yield put(updateReportDisplaySettingsFailure());
  }
}

function* crosstab() {
  yield [
    takeLatest(UPDATE_CROSSTAB, updateCrossTab),
    takeLatest(FETCH_DICTIONARY, fetchDictionary),
    takeLatest(FETCH_REPORT_DISPLAY_SETTINGS, fetchReportDisplaySettings),
    takeEvery(UPDATE_REPORT_DISPLAY_SETTINGS, updateReportDisplaySettings),
    takeLatest(FETCH_CROSSTAB_ALL_REPORT, fetchCrosstabAllReport),
  ];
}

export default crosstab;
