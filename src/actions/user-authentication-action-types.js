import { createAction } from 'redux-actions';

export const LOGIN_AUTHORIZATION = 'LOGIN_AUTHORIZATION';
export const loginAuthorization = createAction(LOGIN_AUTHORIZATION);

export const LOGIN_AUTHORIZATION_REQUESTED = 'LOGIN_AUTHORIZATION_REQUESTED';
export const loginAuthorizationRequested = createAction(LOGIN_AUTHORIZATION_REQUESTED);

export const LOGIN_AUTHORIZATION_SUCCESS = 'LOGIN_AUTHORIZATION_SUCCESS';
export const loginAuthorizationSuccess = createAction(LOGIN_AUTHORIZATION_SUCCESS);

export const LOGIN_AUTHORIZATION_FAILURE = 'LOGIN_AUTHORIZATION_FAILURE';
export const loginAuthorizationFailure = createAction(LOGIN_AUTHORIZATION_FAILURE);

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const forgotPassword = createAction(FORGOT_PASSWORD);

export const FORGOT_PASSWORD_REQUESTED = 'FORGOT_PASSWORD_REQUESTED';
export const forgotPasswordRequested = createAction(FORGOT_PASSWORD_REQUESTED);

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);

export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
export const forgotPasswordFailure = createAction(FORGOT_PASSWORD_FAILURE);

export const SET_PASSWORD = 'SET_PASSWORD';
export const setPassword = createAction(SET_PASSWORD);

export const SET_PASSWORD_REQUESTED = 'SET_PASSWORD_REQUESTED';
export const setPasswordRequested = createAction(SET_PASSWORD_REQUESTED);

export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS';
export const setPasswordSuccess = createAction(SET_PASSWORD_SUCCESS);

export const SET_PASSWORD_FAILURE = 'SET_PASSWORD_FAILURE';
export const setPasswordFailure = createAction(SET_PASSWORD_FAILURE);

export const LOG_OUT = 'LOG_OUT';
export const logOut = createAction(LOG_OUT);

export const LOG_OUT_REQUESTED = 'LOG_OUT_REQUESTED';
export const logOutRequested = createAction(LOG_OUT_REQUESTED);

export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const logOutSuccess = createAction(LOG_OUT_SUCCESS);

export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const logOutFailure = createAction(LOG_OUT_FAILURE);

export const SET_PASSWORD_VALIDATION = 'SET_PASSWORD_VALIDATION';
export const setPasswordValidation = createAction(SET_PASSWORD_VALIDATION);

export const LOGIN_FIELDS_STATE = 'LOGIN_FIELDS_STATE';
export const loginFieldsState = createAction(LOGIN_FIELDS_STATE);

export const FETCH_LOGIN_USER_DETAILS = 'FETCH_LOGIN_USER_DETAILS';
export const fetchLoginUserDetails = createAction(FETCH_LOGIN_USER_DETAILS);

export const FETCH_LOGIN_USER_DETAILS_SUCCESS = 'FETCH_LOGIN_USER_DETAILS_SUCCESS';
export const fetchLoginUserDetailsSuccess = createAction(FETCH_LOGIN_USER_DETAILS_SUCCESS);

export const CONTACT_DETAILS = 'CONTACT_DETAILS';
export const contactDetails = createAction(CONTACT_DETAILS);

export const CONTACT_US = 'CONTACT_US';
export const contactUs = createAction(CONTACT_US);

export const CONTACT_US_REQUESTED = 'CONTACT_US_REQUESTED';
export const contactUsRequested = createAction(CONTACT_US_REQUESTED);

export const CONTACT_US_SUCCESS = 'CONTACT_US_SUCCESS';
export const contactUsSuccess = createAction(CONTACT_US_SUCCESS);

export const CONTACT_US_FAILURE = 'CONTACT_US_FAILURE';
export const contactUsFailure = createAction(CONTACT_US_FAILURE);

export const SHOW_LANGUAGE_DROPDOWN = 'SHOW_LANGUAGE_DROPDOWN';
export const showLanguageDropdown = createAction(SHOW_LANGUAGE_DROPDOWN);
