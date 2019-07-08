import uniqBy from 'lodash/uniqBy';

import { NEW_SURVEY_DETAILS,
  CHECK_SURVEY_CODE_SUCCESS,
  CHECK_SURVEY_CODE_FAILURE,
  CREATE_NEW_SURVEY_SUCCESS,
  CREATE_NEW_SURVEY_FAILURE,
  FETCH_SURVEY_LIST_SUCCESS,
  FETCH_SURVEY_ACTIVITY_LIST_SUCCESS,
  NEW_CROSSTAB_DETAILS,
  CREATE_NEW_CROSSTAB,
  CREATE_NEW_CROSSTAB_REQUESTED,
  CREATE_NEW_CROSSTAB_SUCCESS,
  CREATE_NEW_CROSSTAB_FAILURE,
  CREATE_NEW_SURVEY_REQUESTED,
  DELETE_SURVEY_SUCCESS } from '../actions/survey-action-types';

const initialState = {
  createNewSurveyError: '',
  createNewSurveySuccess: {},
  createSurveyFailure: [],
  createSurveySuccess: {},
  crosstabForm: {},
  isLoading: false,
  surveyActivityList: [],
  surveyCodeCheckError: false,
  surveyCodeCheckSuccess: false,
  surveyDetails: {
    isFileContainDictionary: false,
    isWeighted: false,
  },
  surveyList: [],
};

const NewSurvey = (state = initialState, {
  type, payload,
}) => {
  switch (type) {
    case DELETE_SURVEY_SUCCESS:
      return {
        ...state,
        surveyList: state.surveyList.filter((survey) => survey.surveyId !== payload),
      };

    case NEW_SURVEY_DETAILS:
      return {
        ...state,
        surveyDetails: {
          ...state.surveyDetails,
          ...payload,
        },
      };

    case CHECK_SURVEY_CODE_SUCCESS:
      return {
        ...state,
        surveyCodeCheckError: false,
        surveyCodeCheckSuccess: payload,
      };

    case CHECK_SURVEY_CODE_FAILURE:
      return {
        ...state,
        surveyCodeCheckError: payload,
      };

    case CREATE_NEW_SURVEY_SUCCESS:
      return {
        ...state,
        createNewSurveySuccess: { ...payload },
        surveyDetails: {},
      };

    case CREATE_NEW_SURVEY_REQUESTED:
      return {
        ...state,
        createNewSurveyError: '',
        createNewSurveySuccess: {},
        surveyCodeCheckError: false,
        surveyCodeCheckSuccess: false,
        surveyDetails: {
          isFileContainDictionary: false,
          isWeighted: false,
        },
      };

    case CREATE_NEW_SURVEY_FAILURE:
      return {
        ...state,
        createNewSurveyError: payload,
      };

    case FETCH_SURVEY_LIST_SUCCESS:
      return {
        ...state,
        surveyList: [...state, ...payload],
      };

    case FETCH_SURVEY_ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        surveyActivityList: uniqBy([...state, ...payload], 'surveyId'),
      };

    case NEW_CROSSTAB_DETAILS:
      return {
        ...state,
        crosstabForm: {
          ...state.crosstabForm,
          ...payload,
        },
      };

    case CREATE_NEW_CROSSTAB:
      return {
        ...state,
        createSurveySuccess: { ...payload },
      };

    case CREATE_NEW_CROSSTAB_REQUESTED:
      return {
        ...state,
        createSurveyFailure: [],
        createSurveySuccess: { ...payload },
        isLoading: !Array.isArray(payload),
      };

    case CREATE_NEW_CROSSTAB_SUCCESS:
      return {
        ...state,
        createSurveySuccess: { ...payload },
        crosstabForm: {},
        isLoading: false,
      };

    case CREATE_NEW_CROSSTAB_FAILURE:
      return {
        ...state,
        createSurveyFailure: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default NewSurvey;
