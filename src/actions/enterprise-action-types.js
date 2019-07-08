import { createAction } from 'redux-actions';

export const CREATE_ENTERPRISE = 'CREATE_ENTERPRISE';
export const createEnterprise = createAction(CREATE_ENTERPRISE);

export const CREATE_ENTERPRISE_REQUESTED = 'CREATE_ENTERPRISE_REQUESTED';
export const createEnterpriseRequested = createAction(CREATE_ENTERPRISE_REQUESTED);

export const CREATE_ENTERPRISE_SUCCESS = 'CREATE_ENTERPRISE_SUCCESS';
export const createEnterpriseSuccess = createAction(CREATE_ENTERPRISE_SUCCESS);

export const CREATE_ENTERPRISE_FAILURE = 'CREATE_ENTERPRISE_FAILURE';
export const createEnterpriseFailure = createAction(CREATE_ENTERPRISE_FAILURE);

export const FETCH_ENTERPRISES = 'FETCH_ENTERPRISES';
export const fetchEnterprises = createAction(FETCH_ENTERPRISES);

export const FETCH_ENTERPRISES_REQUESTED = 'FETCH_ENTERPRISES_REQUESTED';
export const fetchEnterprisesRequested = createAction(FETCH_ENTERPRISES_REQUESTED);

export const FETCH_ENTERPRISES_SUCCESS = 'FETCH_ENTERPRISES_SUCCESS';
export const fetchEnterprisesSuccess = createAction(FETCH_ENTERPRISES_SUCCESS);

export const FETCH_ENTERPRISES_FAILURE = 'FETCH_ENTERPRISES_FAILURE';
export const fetchEnterprisesFailure = createAction(FETCH_ENTERPRISES_FAILURE);

export const FETCH_ENTERPRISE_DETAILS_BY_ID = 'FETCH_ENTERPRISE_DETAILS_BY_ID';
export const fetchEnterpriseDetailsById = createAction(FETCH_ENTERPRISE_DETAILS_BY_ID);

export const FETCH_ENTERPRISE_DETAILS_BY_ID_REQUESTED = 'FETCH_ENTERPRISE_DETAILS_BY_ID_REQUESTED';
export const fetchEnterpriseDetailsByIdRequested = createAction(FETCH_ENTERPRISE_DETAILS_BY_ID_REQUESTED);

export const FETCH_ENTERPRISE_DETAILS_BY_ID_SUCCESS = 'FETCH_ENTERPRISE_DETAILS_BY_ID_SUCCESS';
export const fetchEnterpriseDetailsByIdSuccess = createAction(FETCH_ENTERPRISE_DETAILS_BY_ID_SUCCESS);

export const FETCH_ENTERPRISE_DETAILS_BY_ID_FAILURE = 'FETCH_ENTERPRISE_DETAILS_BY_ID_FAILURE';
export const fetchEnterpriseDetailsByIdFailure = createAction(FETCH_ENTERPRISE_DETAILS_BY_ID_FAILURE);

export const UPDATE_ENTERPRISE_FIELDS_STATE = 'UPDATE_ENTERPRISE_FIELDS_STATE';
export const updateEnterpriseFieldsState = createAction(UPDATE_ENTERPRISE_FIELDS_STATE);

export const EDIT_ENTERPRISE = 'EDIT_ENTERPRISE';
export const editEnterprise = createAction(EDIT_ENTERPRISE);

export const EDIT_ENTERPRISE_REQUESTED = 'EDIT_ENTERPRISE_REQUESTED';
export const editEnterpriseRequested = createAction(EDIT_ENTERPRISE_REQUESTED);

export const EDIT_ENTERPRISE_SUCCESS = 'EDIT_ENTERPRISE_SUCCESS';
export const editEnterpriseSuccess = createAction(EDIT_ENTERPRISE_SUCCESS);

export const EDIT_ENTERPRISE_FAILURE = 'EDIT_ENTERPRISE_FAILURE';
export const editEnterpriseFailure = createAction(EDIT_ENTERPRISE_FAILURE);

export const SWITCH_ENTERPRISE = 'SWITCH_ENTERPRISE';
export const switchEnterprise = createAction(SWITCH_ENTERPRISE);

export const TOGGLE_ENTERPRISE = 'TOGGLE_ENTERPRISE';
export const toggleEnterprise = createAction(TOGGLE_ENTERPRISE);

export const CREATE_ENTERPRISE_FIELDS_DETAILS = 'CREATE_ENTERPRISE_FIELDS_DETAILS';
export const createEnterpriseFieldsDetails = createAction(CREATE_ENTERPRISE_FIELDS_DETAILS);
