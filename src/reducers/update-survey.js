import { UPDATE_SURVEY_DATA_SUCCESS, UPDATE_SURVEY_DATA_FAILURE, UPDATE_SURVEY_DETAILS, UPDATE_SURVEY_DATA_REQUESTED } from '../actions/survey-action-types';

const initialState = {
  updateSurveyDataError: '',
  updateSurveyDataSuccess: false,
  updateSurveyDetails: { isFileContainHeader: false },
};

const UpdateSurvey = (state = initialState, {
  type, payload,
}) => {
  switch (type) {
    case UPDATE_SURVEY_DATA_REQUESTED:
      return {
        ...state,
        updateSurveyDataError: '',
      };

    case UPDATE_SURVEY_DATA_SUCCESS:
      return {
        ...state,
        updateSurveyDataSuccess: true,
        updateSurveyDetails: {},
      };

    case UPDATE_SURVEY_DATA_FAILURE:
      return {
        ...state,
        updateSurveyDataError: payload,
      };

    case UPDATE_SURVEY_DETAILS:
      return {
        ...state,
        updateSurveyDetails: {
          ...state.updateSurveyDetails,
          ...payload,
        },
      };

    default:
      return state;
  }
};

export default UpdateSurvey;
