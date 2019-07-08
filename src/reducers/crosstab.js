/* eslint-disable no-param-reassign */
import pick from 'lodash/pick';
import { UPDATE_CROSSTAB,
  UPDATE_CROSSTAB_SUCCESS,
  UPDATE_CROSSTAB_FAILURE,
  UPDATE_TREE_DETAILS,
  FETCH_CROSSTAB_ATTRIBUTES,
  FETCH_CROSSTAB_ATTRIBUTES_SUCCESS,
  FETCH_CROSSTAB_ATTRIBUTES_FAILURE,
  FETCH_DICTIONARY_SUCCESS,
  FETCH_DICTIONARY_FAILURE,
  FETCH_CROSSTAB_REPORT_SUCCESS,
  FETCH_CROSSTAB_REPORT_FAILURE,
  FETCH_CROSSTAB_ALL_REPORT,
  FETCH_CROSSTAB_ALL_REPORT_SUCCESS,
  FETCH_CROSSTAB_ALL_REPORT_FAILURE,
  FETCH_SELECTED_FILTER_CROSSTAB_REPORT,
  REMOVE_FILTER_CROSSTAB_REPORT,
  UPDATE_CROSSTAB_DETAILS,
  FETCH_REPORT_DISPLAY_SETTINGS_SUCCESS,
  FETCH_REPORT_DISPLAY_SETTINGS_FAILURE,
  REPORT_DISPLAY_SETTINGS_HANDEL_CHANGE,
  UPDATE_REPORT_DISPLAY_SETTINGS_FAILURE,
  UPDATE_REPORT_DISPLAY_SETTINGS_SUCCESS,
  UPDATE_CROSSTAB_ALL_REPORT } from '../actions/crosstab-action-types';

const initialState = {
  crosstabAllReport: {},
  crosstabData: [],
  crosstabDetails: {
    activeFilter: '',
    calculate: false,
    columns: [],
    filters: [],
    rows: [],
    sheetId: '',
    weight: [],
  },
  crosstabReport: [],
  crosstabReportError: {},
  dictionary: [],
  isAllReportLoading: true,
  isLoading: true,
  reportDisplaySettings: {},
  reportDisplaySettingsError: {},
  treeDetails: {
    columns: [],
    filters: [],
    rows: [],
    weight: [],
  },
  updateCrossTabError: {},
  updateCrossTabStatus: null,
  updateReportSettingsStatus: null,
};

const selectedFilterCrosstab = (data, selectedFilter) => {
  const crosstabReport = pick(data, [selectedFilter]);

  return Object.values(crosstabReport)[0];
};

const crosstab = (state = initialState, {
  type, payload,
}) => {
  switch (type) {
    case UPDATE_CROSSTAB:
      return {
        ...state,
        updateCrossTabError: null,
        updateCrossTabStatus: null,
      };

    case UPDATE_CROSSTAB_SUCCESS:
      return {
        ...state,
        updateCrossTabError: null,
        updateCrossTabStatus: 'success',
      };

    case UPDATE_CROSSTAB_FAILURE:
      return {
        ...state,
        updateCrossTabError: { ...payload },
        updateCrossTabStatus: 'failure',
      };

    case FETCH_CROSSTAB_ATTRIBUTES:
      return {
        ...state,
        fetchCrosstabAttributesError: null,
        fetchCrosstabAttributesStatus: null,
      };

    case FETCH_CROSSTAB_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        crosstabDetails: payload,
        fetchCrosstabAttributesError: null,
        fetchCrosstabAttributesStatus: 'success',
      };

    case FETCH_CROSSTAB_ATTRIBUTES_FAILURE:
      return {
        ...state,
        fetchCrosstabAttributesError: { ...payload },
        fetchCrosstabAttributesStatus: 'failure',
      };

    case FETCH_DICTIONARY_SUCCESS:
      return {
        ...state,
        dictionary: payload,
      };

    case FETCH_DICTIONARY_FAILURE:
      return {
        ...state,
        fetchDictionaryError: { ...payload },
      };

    case FETCH_CROSSTAB_REPORT_SUCCESS:
      return {
        ...state,
        crosstabReport: payload,
        isLoading: false,
      };

    case FETCH_CROSSTAB_REPORT_FAILURE:
      return {
        ...state,
        crosstabReportError: { ...payload },
        isLoading: false,
      };

    case UPDATE_CROSSTAB_ALL_REPORT:
      return {
        ...state,
        crosstabAllReport: {
          ...state.crosstabAllReport,
          [payload.filterCode]: JSON.stringify(payload.data),
        },
      };

    case FETCH_CROSSTAB_ALL_REPORT:
      return {
        ...state,
        isAllReportLoading: true,
        isLoading: true,
      };

    case FETCH_CROSSTAB_ALL_REPORT_SUCCESS:
      return {
        ...state,
        crosstabAllReport: payload,
        isAllReportLoading: false,
        isLoading: false,
      };

    case FETCH_CROSSTAB_ALL_REPORT_FAILURE:
      return {
        ...state,
        crosstabAllReportError: { ...payload },
      };

    case UPDATE_CROSSTAB_DETAILS:
      return {
        ...state,
        crosstabDetails: {
          ...payload,
          sheetId: state.crosstabDetails.sheetId,
        },
      };

    case FETCH_SELECTED_FILTER_CROSSTAB_REPORT:
      return {
        ...state,
        crosstabReport: JSON.parse(selectedFilterCrosstab(state.crosstabAllReport, payload)),
        isLoading: false,
      };

    case FETCH_REPORT_DISPLAY_SETTINGS_SUCCESS:
      return {
        ...state,
        reportDisplaySettings: payload,
      };

    case FETCH_REPORT_DISPLAY_SETTINGS_FAILURE:
      return {
        ...state,
        reportDisplaySettingsError: { ...payload },
      };

    case REPORT_DISPLAY_SETTINGS_HANDEL_CHANGE: {
      const keys = Object.keys(payload)[0].split('.');
      const values = Object.values(payload)[0];

      if (keys[0] === 'dataItems') {
        let value = values;

        if (keys[2] === 'displayOrder') {
          value = Number(values);
        }

        return {
          ...state,
          reportDisplaySettings: {
            ...state.reportDisplaySettings,
            [keys[0]]: {
              ...state.reportDisplaySettings[keys[0]],
              [keys[1]]: {
                ...state.reportDisplaySettings.dataItems[keys[1]],
                ...{ [keys[2]]: value },
              },
            },
          },
        };
      }

      if (keys[0] === 'weightFile') {
        return {
          ...state,
          reportDisplaySettings: {
            ...state.reportDisplaySettings,
            ...{ weightFile: values ? [values] : [] },
          },
        };
      }

      return state;
    }

    case UPDATE_REPORT_DISPLAY_SETTINGS_SUCCESS:
      return {
        ...state,
        updateReportSettingsStatus: {
          message: 'Settings successfully updated.',
          status: true,
        },
      };

    case UPDATE_REPORT_DISPLAY_SETTINGS_FAILURE:
      return {
        ...state,
        updateReportSettingsStatus: {
          message: 'Error in request processing please try again later.',
          status: false,
        },
      };

    case REMOVE_FILTER_CROSSTAB_REPORT:
      delete state.crosstabAllReport[payload];

      return {
        ...state,
        crosstabAllReport: state.crosstabAllReport,
      };

    case UPDATE_TREE_DETAILS:
      return {
        ...state,
        treeDetails: payload,
      };

    default:
      return state;
  }
};

export default crosstab;
