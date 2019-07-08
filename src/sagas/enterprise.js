import { call, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CREATE_ENTERPRISE,
  createEnterpriseRequested,
  createEnterpriseSuccess,
  createEnterpriseFailure,
  EDIT_ENTERPRISE,
  editEnterpriseRequested,
  editEnterpriseSuccess,
  editEnterpriseFailure,
  FETCH_ENTERPRISES,
  fetchEnterprisesRequested,
  fetchEnterprisesSuccess,
  fetchEnterprisesFailure,
  FETCH_ENTERPRISE_DETAILS_BY_ID,
  fetchEnterpriseDetailsByIdRequested,
  fetchEnterpriseDetailsByIdSuccess,
  fetchEnterpriseDetailsByIdFailure,
  toggleEnterprise } from '../actions/enterprise-action-types';
import { notificationRequested } from '../actions/notification-action-types';
import User from '../utils/user';
import Utils from '../utils';
import { LOGIN_SERVICE_URL } from '../constants';

const {
  userInfo, removeUserDetailsToken,
} = new User();

const {
  httpHelper: {
    getRequest, patchRequest, postRequest,
  },
} = new Utils().getAll();

export function* createEnterprise({ payload }) {
  const { accessToken } = userInfo();

  const payloadData = {
    data: payload,
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/companies`,
  };

  yield put(createEnterpriseRequested());

  const {
    error, status,
  } = yield call(postRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 201 && !error) {
    yield put(createEnterpriseSuccess());
    yield put(push('/manage-users/manage-enterprise'));
    yield put(
      notificationRequested({
        notificationMessage: 'successEnterpriseCreatedSuccessfully',
        notificationType: 'success',
      })
    );
  } else {
    yield put(createEnterpriseFailure(error));
    yield put(
      notificationRequested({
        notificationMessage: error.response.data.details[0].message,
        notificationType: 'serverError',
      })
    );
  }
}

export function* fetchEnterpriseDetailsById({ payload }) {
  const { accessToken } = userInfo();

  const {
    companyId, method,
  } = payload;

  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/companies/companyinfo/${companyId}`,
  };

  yield put(fetchEnterpriseDetailsByIdRequested());

  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    if (method === 'editEnterprise') {
      yield put(fetchEnterpriseDetailsByIdSuccess(data));
    } else {
      yield put(toggleEnterprise(data));
    }
  } else {
    yield put(fetchEnterpriseDetailsByIdFailure(error));
  }
}

export function* fetchEnterprises({ payload }) {
  const {
    companyId, accessToken,
  } = userInfo();

  const payloadData = {
    data: {
      ...payload,
      companyId,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/companies`,
  };

  yield put(fetchEnterprisesRequested());

  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    yield put(fetchEnterprisesSuccess(data));
  } else {
    yield put(fetchEnterprisesFailure(error));
  }
}

export function* editEnterprise({ payload }) {
  const { accessToken } = userInfo();

  const { companyId } = payload;

  const payloadData = {
    data: payload,
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/companies/${companyId}`,
  };

  yield put(editEnterpriseRequested());

  const {
    error, status,
  } = yield call(patchRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 204 && !error) {
    yield put(push('/manage-users/manage-enterprise'));
    yield put(
      notificationRequested({
        notificationMessage: 'successEnterpriseUpdatedSuccessfully',
        notificationType: 'success',
      })
    );

    yield put(editEnterpriseSuccess(payload));
  } else {
    yield put(editEnterpriseFailure(error));
    yield put(
      notificationRequested({
        notificationMessage: 'errorEnterpriseUpdatedSuccessfully',
        notificationType: 'error',
      })
    );
  }
}

function* enterprise() {
  yield [
    takeEvery(FETCH_ENTERPRISE_DETAILS_BY_ID, fetchEnterpriseDetailsById),
    takeLatest(CREATE_ENTERPRISE, createEnterprise),
    takeLatest(EDIT_ENTERPRISE, editEnterprise),
    takeLatest(FETCH_ENTERPRISES, fetchEnterprises),
  ];
}

export default enterprise;
