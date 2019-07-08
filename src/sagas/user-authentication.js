import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CONTACT_US,
  contactUsRequested,
  contactUsSuccess,
  contactUsFailure,
  LOGIN_AUTHORIZATION,
  loginAuthorizationSuccess,
  loginAuthorizationFailure,
  FETCH_LOGIN_USER_DETAILS,
  fetchLoginUserDetailsSuccess,
  FORGOT_PASSWORD,
  forgotPasswordRequested,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  SET_PASSWORD,
  setPasswordRequested,
  setPasswordSuccess,
  setPasswordFailure,
  LOG_OUT,
  logOutRequested,
  logOutSuccess,
  logOutFailure } from '../actions/user-authentication-action-types';
import { notificationRequested } from '../actions/notification-action-types';
import { LOGIN_SERVICE_URL } from '../constants';
import Utils from '../utils';
import Storage from '../utils/storage';
import User from '../utils/user';

const {
  httpHelper: {
    postRequest, patchRequest,
  },
} = new Utils().getAll();
const {
  getAccessToken, removeUserDetailsToken, userInfo,
} = new User();

export function* contactUs({ payload }) {
  const payloadData = {
    data: payload,
    url: `${LOGIN_SERVICE_URL}/contactUs`,
  };

  yield put(contactUsRequested());

  const {
    status, error,
  } = yield call(postRequest, payloadData);

  if (status === 200 && error === null) {
    yield put(contactUsSuccess());

    yield put(
      notificationRequested({
        notificationMessage: 'successContactMessageSuccessfully',
        notificationType: 'success',
      })
    );
  } else {
    yield put(contactUsFailure());
    yield put(
      notificationRequested({
        notificationMessage: 'errorContactMessage',
        notificationType: 'error',
      })
    );
  }
}

export function* loginAuthorization({ payload }) {
  const payloadData = {
    data: payload,
    url: `${LOGIN_SERVICE_URL}/login`,
  };

  const {
    data, error, status,
  } = yield call(postRequest, payloadData);

  if (status === 200 && data) {
    const { response } = data;

    Storage.save('userDetails', {
      ...response,
      adminCompanyId: response.companyId,
    });

    yield put(loginAuthorizationSuccess({ response }));
    yield put(push('/'));
  } else if (status === 401) {
    yield put(loginAuthorizationFailure(error.response.data.description));
  } else if (status === 400) {
    yield put(loginAuthorizationFailure(error.response.data.details[0].message));
  }
}

export function* forgotPassword({ payload }) {
  const payloadData = {
    data: payload,
    url: `${LOGIN_SERVICE_URL}/PasswordCodes`,
  };

  yield put(forgotPasswordRequested());

  const {
    error, status,
  } = yield call(postRequest, payloadData);

  if (status === 200 && !error) {
    yield put(
      notificationRequested({
        notificationMessage: 'successForgotPasswordNotification',
        notificationType: 'success',
      })
    );
    yield put(forgotPasswordSuccess());
  } else {
    yield put(
      notificationRequested({
        notificationMessage: 'errorForgotPasswordNotification',
        notificationType: 'error',
      })
    );
    yield put(forgotPasswordFailure(error));
  }
}

export function* setPassword({ payload }) {
  const payloadData = {
    data: payload,
    url: `${LOGIN_SERVICE_URL}/Passwords`,
  };

  yield put(setPasswordRequested());

  const {
    data, error, status,
  } = yield call(patchRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    Storage.save('userDetails', data);

    yield put(push('/'));
    yield put(
      notificationRequested({
        notificationMessage: 'successSetPasswordNotification',
        notificationType: 'success',
      })
    );
    yield put(setPasswordSuccess());
  } else {
    if (error.response.data.details.length) {
      yield put(
        notificationRequested({
          notificationMessage: error.response.data.details[0].message,
          notificationType: 'serverError',
        })
      );
    }
    yield put(setPasswordFailure(error));
  }
}

function* fetchLoginUserDetails() {
  const userDetails = userInfo();

  yield put(fetchLoginUserDetailsSuccess(userDetails));
}

function* logOut() {
  const accessToken = getAccessToken();

  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/logout`,
  };

  yield put(logOutRequested());

  const {
    error, status,
  } = yield call(postRequest, payloadData);

  if (status === 200 && !error) {
    removeUserDetailsToken();
    yield put(push('/'));
    yield put(
      notificationRequested({
        notificationMessage: 'logoutNotification',
        notificationType: 'success',
      })
    );
    yield put(logOutSuccess());
  } else if (error.response.status === 401 && error) {
    yield put(push('/'));
    yield put(
      notificationRequested({
        notificationMessage: 'logoutNotification',
        notificationType: 'success',
      })
    );
    yield put(logOutSuccess());
  } else {
    yield put(logOutFailure(error));
  }
}

function* UserAuthentication() {
  yield [
    takeLatest(CONTACT_US, contactUs),
    takeLatest(LOGIN_AUTHORIZATION, loginAuthorization),
    takeLatest(FORGOT_PASSWORD, forgotPassword),
    takeLatest(SET_PASSWORD, setPassword),
    takeLatest(LOG_OUT, logOut),
    takeLatest(FETCH_LOGIN_USER_DETAILS, fetchLoginUserDetails),
  ];
}

export default UserAuthentication;
