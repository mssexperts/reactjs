import { createAction } from 'redux-actions';

export const NOTIFICATION_REQUESTED = 'NOTIFICATION_REQUESTED';
export const notificationRequested = createAction(NOTIFICATION_REQUESTED);

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const showNotification = createAction(SHOW_NOTIFICATION);
