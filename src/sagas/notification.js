import { takeLatest, put } from 'redux-saga/effects';
import { showNotification, NOTIFICATION_REQUESTED } from '../actions/notification-action-types';

export function* notificationHandler({ payload }) {
  yield put(showNotification(payload));
}

function* notification() {
  yield takeLatest(NOTIFICATION_REQUESTED, notificationHandler);
}

export default notification;
