import { NOTIFICATION_REQUESTED, SHOW_NOTIFICATION } from '../actions/notification-action-types';

const initialState = {
  message: {
    notificationMessage: '',
    notificationType: '',
  },
  notificationStatus: null,
};

const NOTIFICATION = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case NOTIFICATION_REQUESTED:
      return {
        ...state,
        message: { ...state.message },
        notificationStatus: null,
      };

    case SHOW_NOTIFICATION:
      return {
        ...state,
        message: payload,
        notificationStatus: 'show',
      };

    default:
      return { ...state };
  }
};

export default NOTIFICATION;
