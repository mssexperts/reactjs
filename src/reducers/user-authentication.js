import { CONTACT_DETAILS,
  LOGIN_AUTHORIZATION_REQUESTED,
  LOGIN_AUTHORIZATION_SUCCESS,
  LOGIN_AUTHORIZATION_FAILURE,
  FORGOT_PASSWORD_REQUESTED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  LOG_OUT_REQUESTED,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  FETCH_LOGIN_USER_DETAILS_SUCCESS,
  SET_PASSWORD_REQUESTED,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILURE,
  SET_PASSWORD_VALIDATION,
  SHOW_LANGUAGE_DROPDOWN,
  LOGIN_FIELDS_STATE } from '../actions/user-authentication-action-types';
import { languages } from '../../config/dropdown';
import Translate from '../utils/translate';

const updateLanguagesList = (data) => {
  const updatedLanguageList = data.map((language) => ({
    ...language,
    name: Translate.translate(language.name),
  }));

  return updatedLanguageList;
};

const initialState = {
  contactFieldDetails: {},
  forgotPasswordError: {},
  forgotPasswordStatus: null,
  logOutError: {},
  logOutStatus: null,
  loginAuthorizationError: '',
  loginAuthorizationStatus: null,
  loginFieldsDetails: { languages: updateLanguagesList(languages) },
  loginUserDetails: {},
  setPasswordError: {},
  setPasswordStatus: null,
  setPasswordValidationDetail: {},
  showLanguageMenu: false,
};

const UserAuthentication = (state = initialState, {
  type, payload,
}) => {
  switch (type) {
    case LOGIN_AUTHORIZATION_REQUESTED:
      return {
        ...state,
        loginAuthorizationError: null,
        loginAuthorizationStatus: null,
      };

    case LOGIN_AUTHORIZATION_SUCCESS:
      return {
        ...state,
        loginAuthorizationError: null,
        loginAuthorizationStatus: 'success',
      };

    case LOGIN_AUTHORIZATION_FAILURE:
      return {
        ...state,
        loginAuthorizationError: payload,
        loginAuthorizationStatus: 'failure',
      };

    case FORGOT_PASSWORD_REQUESTED:
      return {
        ...state,
        forgotPasswordError: null,
        forgotPasswordStatus: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordError: null,
        forgotPasswordStatus: 'success',
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordError: { ...payload },
        forgotPasswordStatus: 'failure',
      };

    case LOG_OUT_REQUESTED:
      return {
        ...state,
        logOutError: null,
        logOutStatus: null,
      };

    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutError: null,
        logOutStatus: 'success',
      };

    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutError: { ...payload },
        logOutStatus: 'failure',
      };

    case SET_PASSWORD_REQUESTED:
      return {
        ...state,
        setPasswordError: null,
        setPasswordStatus: null,
      };

    case SET_PASSWORD_SUCCESS:
      return {
        ...state,
        setPasswordError: null,
        setPasswordStatus: 'success',
      };

    case SET_PASSWORD_FAILURE:
      return {
        ...state,
        setPasswordError: { ...payload },
        setPasswordStatus: 'failure',
      };

    case SET_PASSWORD_VALIDATION:
      return {
        ...state,
        setPasswordValidationDetail: payload,
      };

    case LOGIN_FIELDS_STATE:
      return {
        ...state,
        loginAuthorizationError: '',
        loginFieldsDetails: {
          ...payload,
          languages: updateLanguagesList(languages),
        },
      };

    case FETCH_LOGIN_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loginUserDetails: payload,
      };

    case CONTACT_DETAILS:
      return {
        ...state,
        contactFieldDetails: payload,
      };

    case SHOW_LANGUAGE_DROPDOWN:
      return {
        ...state,
        showLanguageMenu: payload,
      };
    default:
      return state;
  }
};

export default UserAuthentication;
