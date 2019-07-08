import { createAction } from 'redux-actions';

export const UPLOAD_SURVEY = 'UPLOAD_SURVEY';
export const uploadSurvey = createAction(UPLOAD_SURVEY);

export const NEW_SURVEY_DETAILS = 'NEW_SURVEY_DETAILS';
export const newSurveyDetails = createAction(NEW_SURVEY_DETAILS);

export const CHECK_SURVEY_CODE = 'CHECK_SURVEY_CODE';
export const checkSurveyCode = createAction(CHECK_SURVEY_CODE);

export const CHECK_SURVEY_CODE_REQUESTED = 'CHECK_SURVEY_CODE_REQUESTED';
export const checkSurveyCodeRequested = createAction(CHECK_SURVEY_CODE_REQUESTED);

export const CHECK_SURVEY_CODE_SUCCESS = 'CHECK_SURVEY_CODE_SUCCESS';
export const checkSurveyCodeSuccess = createAction(CHECK_SURVEY_CODE_SUCCESS);

export const CHECK_SURVEY_CODE_FAILURE = 'CHECK_SURVEY_CODE_FAILURE';
export const checkSurveyCodeFailure = createAction(CHECK_SURVEY_CODE_FAILURE);

export const CREATE_NEW_SURVEY = 'CREATE_NEW_SURVEY';
export const createNewSurvey = createAction(CREATE_NEW_SURVEY);

export const CREATE_NEW_SURVEY_REQUESTED = 'CREATE_NEW_SURVEY_REQUESTED';
export const createNewSurveyRequested = createAction(CREATE_NEW_SURVEY_REQUESTED);

export const CREATE_NEW_SURVEY_SUCCESS = 'CREATE_NEW_SURVEY_SUCCESS';
export const createNewSurveySuccess = createAction(CREATE_NEW_SURVEY_SUCCESS);

export const CREATE_NEW_SURVEY_FAILURE = 'CREATE_NEW_SURVEY_FAILURE';
export const createNewSurveyFailure = createAction(CREATE_NEW_SURVEY_FAILURE);

export const FETCH_SURVEY_LIST = 'FETCH_SURVEY_LIST';
export const fetchSurveyList = createAction(FETCH_SURVEY_LIST);

export const FETCH_SURVEY_LIST_REQUESTED = 'FETCH_SURVEY_LIST_REQUESTED';
export const fetchSurveyListRequested = createAction(FETCH_SURVEY_LIST_REQUESTED);

export const FETCH_SURVEY_LIST_SUCCESS = 'FETCH_SURVEY_LIST_SUCCESS';
export const fetchSurveyListSuccess = createAction(FETCH_SURVEY_LIST_SUCCESS);

export const FETCH_SURVEY_LIST_FAILURE = 'FETCH_SURVEY_LIST_FAILURE';
export const fetchSurveyListFailure = createAction(FETCH_SURVEY_LIST_FAILURE);

export const FETCH_SURVEY_ACTIVITY_LIST = 'FETCH_SURVEY_ACTIVITY_LIST';
export const fetchSurveyActivityList = createAction(FETCH_SURVEY_ACTIVITY_LIST);

export const FETCH_SURVEY_ACTIVITY_LIST_REQUESTED = 'FETCH_SURVEY_ACTIVITY_LIST_REQUESTED';
export const fetchSurveyActivityListRequested = createAction(FETCH_SURVEY_ACTIVITY_LIST_REQUESTED);

export const FETCH_SURVEY_ACTIVITY_LIST_SUCCESS = 'FETCH_SURVEY_ACTIVITY_LIST_SUCCESS';
export const fetchSurveyActivityListSuccess = createAction(FETCH_SURVEY_ACTIVITY_LIST_SUCCESS);

export const FETCH_SURVEY_ACTIVITY_LIST_FAILURE = 'FETCH_SURVEY_ACTIVITY_LIST_FAILURE';
export const fetchSurveyActivityListFailure = createAction(FETCH_SURVEY_ACTIVITY_LIST_FAILURE);

export const NEW_CROSSTAB_DETAILS = 'NEW_CROSSTAB_DETAILS';
export const newCrosstabDetails = createAction(NEW_CROSSTAB_DETAILS);

export const CREATE_NEW_CROSSTAB = 'CREATE_NEW_CROSSTAB';
export const createNewCrosstab = createAction(CREATE_NEW_CROSSTAB);

export const CREATE_NEW_CROSSTAB_REQUESTED = 'CREATE_NEW_CROSSTAB_REQUESTED';
export const createNewCrosstabRequested = createAction(CREATE_NEW_CROSSTAB_REQUESTED);

export const CREATE_NEW_CROSSTAB_SUCCESS = 'CREATE_NEW_CROSSTAB_SUCCESS';
export const createNewCrosstabSuccess = createAction(CREATE_NEW_CROSSTAB_SUCCESS);

export const CREATE_NEW_CROSSTAB_FAILURE = 'CREATE_NEW_CROSSTAB_FAILURE';
export const createNewCrosstabFailure = createAction(CREATE_NEW_CROSSTAB_FAILURE);

export const OPEN_CROSSTAB_ACTION = 'OPEN_CROSSTAB_ACTION';
export const openCrosstabAction = createAction(OPEN_CROSSTAB_ACTION);

export const UPDATE_SURVEY_DATA = 'UPDATE_SURVEY_DATA';
export const updateSurveyDataAction = createAction(UPDATE_SURVEY_DATA);

export const UPDATE_SURVEY_DATA_REQUESTED = 'UPDATE_SURVEY_DATA_REQUESTED';
export const updateSurveyDataActionRequested = createAction(UPDATE_SURVEY_DATA_REQUESTED);

export const UPDATE_SURVEY_DATA_SUCCESS = 'UPDATE_SURVEY_DATA_SUCCESS';
export const updateSurveyDataActionSuccess = createAction(UPDATE_SURVEY_DATA_SUCCESS);

export const UPDATE_SURVEY_DATA_FAILURE = 'UPDATE_SURVEY_DATA_FAILURE';
export const updateSurveyDataActionFailure = createAction(UPDATE_SURVEY_DATA_FAILURE);

export const UPDATE_SURVEY_DETAILS = 'UPDATE_SURVEY_DETAILS';
export const updateSurveyDetailsAction = createAction(UPDATE_SURVEY_DETAILS);

export const DELETE_SURVEY = 'DELETE_SURVEY';
export const deleteSurvey = createAction(DELETE_SURVEY);

export const DELETE_SURVEY_REQUESTED = 'DELETE_SURVEY_REQUESTED';
export const deleteSurveyRequested = createAction(DELETE_SURVEY_REQUESTED);

export const DELETE_SURVEY_SUCCESS = 'DELETE_SURVEY_SUCCESS';
export const deleteSurveySuccess = createAction(DELETE_SURVEY_SUCCESS);

export const DELETE_CROSSTAB = 'DELETE_CROSSTAB';
export const deleteCrosstab = createAction(DELETE_CROSSTAB);

export const DELETE_CROSSTAB_SUCCESS = 'DELETE_CROSSTAB_SUCCESS';
export const deleteCrosstabSuccess = createAction(DELETE_CROSSTAB_SUCCESS);
