/* eslint-disable no-multi-spaces */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { notificationRequested } from '../actions/notification-action-types';
import { CREATE_GROUP,
  createGroupRequested,
  createGroupSuccess,
  createGroupFailure,
  DELETE_GROUP,
  deleteGroupRequested,
  deleteGroupSuccess,
  deleteGroupFailure,
  EDIT_GROUP,
  editGroupRequested,
  editGroupSuccess,
  editGroupFailure,
  FETCH_GROUPS,
  fetchGroupsRequested,
  fetchGroupsSuccess,
  fetchGroupsFailure,
  CREATE_USER,
  createUserRequested,
  createUserSuccess,
  createUserFailure,
  FETCH_PERMISSIONS,
  fetchPermissionsRequested,
  fetchPermissionsSuccess,
  fetchPermissionsFailure,
  FETCH_USERS,
  fetchUsersRequested,
  fetchUsersSuccess,
  fetchUsersFailure,
  FETCH_USERS_STAT,
  fetchUsersStatRequested,
  fetchUsersStatSuccess,
  fetchUsersStatFailure,
  FETCH_USERS_DASHBOARD,
  FILTER_USERS,
  filterUsersRequested,
  filterUsersSuccess,
  filterUsersFailure,
  FETCH_USER_DETAILS,
  fetchUserDetailsRequested,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  UPDATE_USER_DETAILS,
  updateUserDetailsRequested,
  updateUserDetailsSuccess,
  updateUserDetailsFailure } from '../actions/manage-users-action-types';
import { SWITCH_ENTERPRISE, toggleEnterprise } from '../actions/enterprise-action-types';
import { LOGIN_SERVICE_URL } from '../constants';
import Storage from '../utils/storage';
import Utils from '../utils';
import User from '../utils/user';

const {
  httpHelper: {
    deleteRequest, getRequest, postRequest, patchRequest,
  },
} = new Utils().getAll();
const {
  userInfo, removeUserDetailsToken,
} = new User();

export function* createGroup({ payload }) {
  const {
    companyId, accessToken,
  } = userInfo();

  const payloadData = {
    data: {
      ...payload,
      companyId,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/groups`,
  };

  yield put(createGroupRequested());

  const {
    error, status,
  } = yield call(postRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 201 && !error) {
    yield put(push('/manage-users'));
    yield put(
      notificationRequested({
        notificationMessage: 'groupAddedSuccessfully',
        notificationType: 'success',
      })
    );
    yield put(createGroupSuccess());
  } else {
    yield put(createGroupFailure(error));
  }
}

export function* deleteGroup({ payload }) {
  const {
    companyId, accessToken,
  } = userInfo();

  const payloadData = {
    data: { companyId },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/Groups/${payload}`,
  };

  yield put(deleteGroupRequested());

  const {
    error, status,
  } = yield call(deleteRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 204 && !error) {
    yield put(push('/manage-users'));
    yield put(
      notificationRequested({
        notificationMessage: 'deleteGroupSuccessfully',
        notificationType: 'success',
      })
    );
    yield put(deleteGroupSuccess(payload));
  } else if (error.response.status === 405 && error) {
    yield put(
      notificationRequested({
        notificationMessage: 'canNotDeleteGroupsHavingUsers',
        notificationType: 'error',
      })
    );
    yield put(deleteGroupFailure(error));
  } else {
    yield put(deleteGroupFailure(error));
  }
}

export function* editGroup({ payload }) {
  const {
    companyId, accessToken,
  } = userInfo();

  const payloadData = {
    data: {
      ...payload,
      companyId,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/Groups`,
  };

  yield put(editGroupRequested());

  const {
    data, error, status,
  } = yield call(patchRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  if (status === 200 && !error) {
    yield put(
      notificationRequested({
        notificationMessage: 'groupUpdatedSuccessfully',
        notificationType: 'success',
      })
    );
    yield put(editGroupSuccess(data));
  } else {
    yield put(editGroupFailure(error));
  }
}

export function* fetchGroups() {
  const {
    accessToken, companyId,
  } = userInfo();
  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/groups/${companyId}`,
  };

  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  yield put(fetchGroupsRequested());

  if (!error) {
    yield put(fetchGroupsSuccess(data));
  } else {
    yield put(fetchGroupsFailure(error));
  }
}

export function* fetchPermissions() {
  const {
    accessToken, companyId,
  } = userInfo();

  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/permissions?companyId=${companyId}`,
  };

  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  yield put(fetchPermissionsRequested());

  if (!error) {
    yield put(fetchPermissionsSuccess(data));
  } else {
    yield put(fetchPermissionsFailure(error));
  }
}

export function* createUser({ payload }) {
  const {
    accessToken,
    companyId,
    //  userId,
    userName,
  } = userInfo();
  const payloadData = {
    data: {
      ...payload,
      // addedById: userId,
      companyId,
      senderName: userName,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/users`,
  };

  const {
    data, error, status,
  } = yield call(postRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  yield put(createUserRequested());

  if (!error) {
    yield put(createUserSuccess(data));

    yield put(push('/manage-users'));
    yield put(
      notificationRequested({
        notificationMessage: 'successUserCreateNotification',
        notificationType: 'success',
      })
    );
  } else {
    yield put(createUserFailure(error));
    yield put(
      notificationRequested({
        notificationMessage: 'errorWhileCreatingUser',
        notificationType: 'error',
      })
    );
  }
}

export function* fetchUsers() {
  const {
    accessToken, companyId,
  } = userInfo();

  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/Users/getByCompanyId/${companyId}`,
  };
  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  yield put(fetchUsersRequested());

  if (!error) {
    yield put(fetchUsersSuccess(data));
  } else {
    yield put(fetchUsersFailure(error));
  }
}

export function* fetchUsersStat() {
  const {
    accessToken, companyId,
  } = userInfo();

  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/users/userstats/${companyId}`,
  };
  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  yield put(fetchUsersStatRequested());

  if (!error) {
    yield put(fetchUsersStatSuccess(data));
  } else {
    yield put(fetchUsersStatFailure(error));
  }
}

export function* filterUsers({ payload }) {
  const {
    accessToken, companyId,
  } = userInfo();

  let filterParameters = '';

  if (payload) {
    Object.keys(payload).forEach((key) => {
      if (payload[key]) {
        filterParameters += `&${key}=${payload[key]}`;
      }
    });
  }

  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/users/searchusers?companyId=${companyId}${filterParameters}`,
  };

  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  yield put(filterUsersRequested());

  if (!error) {
    yield put(filterUsersSuccess(data));
  } else {
    yield put(filterUsersFailure(error));
  }
}

export function* fetchUserDetails({ payload }) {
  const { accessToken } = userInfo();
  const payloadData = {
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/users/${payload}`,
  };
  const {
    data, error, status,
  } = yield call(getRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  yield put(fetchUserDetailsRequested());

  if (!error) {
    yield put(fetchUserDetailsSuccess(data));
  } else {
    yield put(fetchUserDetailsFailure(error));
  }
}

export function* updateUserDetails({ payload }) {
  const {
    accessToken, companyId, userId,
  } = userInfo();

  const payloadData = {
    data: {
      ...payload,
      companyId,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
    url: `${LOGIN_SERVICE_URL}/users/${userId}`,
  };

  const {
    error, status,
  } = yield call(patchRequest, payloadData);

  if (status === 401) {
    removeUserDetailsToken();
    yield put(push('/'));
  }

  yield put(updateUserDetailsRequested());
  if (status === 204 && !error) {
    yield put(push('/manage-users'));
    yield put(updateUserDetailsSuccess());
    yield put(
      notificationRequested({
        notificationMessage: 'successUserUpdateNotification',
        notificationType: 'success',
      })
    );
  } else if (status === 400) {
    yield put(updateUserDetailsFailure(error.details.message));
    yield put(
      notificationRequested({
        notificationMessage: 'errorUserUpdateNotification',
        notificationType: 'error',
      })
    );
  } else {
    yield put(updateUserDetailsFailure(error));
    yield put(
      notificationRequested({
        notificationMessage: 'errorUserUpdateNotification',
        notificationType: 'error',
      })
    );
  }
}

export function* usersDashboard() {
  yield call(fetchUsersStat);
  yield call(fetchPermissions);
  yield call(fetchGroups);
  yield call(fetchUsers);
}

export function* switchEnterprise({ payload }) {
  const { companyId } = payload;

  const userDetails = userInfo();
  const userDetailsData = {
    ...userDetails,
    companyId,
  };

  yield put(toggleEnterprise(payload));

  yield Storage.save('userDetails', userDetailsData);
  yield call(usersDashboard);
}

function* ManageUsers() {
  yield [
    takeLatest(CREATE_GROUP, createGroup),
    takeLatest(DELETE_GROUP, deleteGroup),
    takeLatest(EDIT_GROUP, editGroup),
    takeLatest(FETCH_GROUPS, fetchGroups),
    takeLatest(FETCH_PERMISSIONS, fetchPermissions),
    takeLatest(CREATE_USER, createUser),
    takeLatest(FETCH_USERS, fetchUsers),
    takeLatest(FETCH_USERS_STAT, fetchUsersStat),
    takeLatest(FETCH_USERS_DASHBOARD, usersDashboard),
    takeLatest(FILTER_USERS, filterUsers),
    takeLatest(FETCH_USER_DETAILS, fetchUserDetails),
    takeLatest(UPDATE_USER_DETAILS, updateUserDetails),
    takeLatest(SWITCH_ENTERPRISE, switchEnterprise),
  ];
}

export default ManageUsers;
