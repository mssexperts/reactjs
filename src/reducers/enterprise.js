/* eslint no-param-reassign: 0 */

import uniqBy from 'lodash/uniqBy';
import moment from 'moment';
import { CREATE_ENTERPRISE_REQUESTED,
  CREATE_ENTERPRISE_SUCCESS,
  CREATE_ENTERPRISE_FAILURE,
  CREATE_ENTERPRISE_FIELDS_DETAILS,
  FETCH_ENTERPRISES_REQUESTED,
  FETCH_ENTERPRISES_SUCCESS,
  FETCH_ENTERPRISES_FAILURE,
  FETCH_ENTERPRISE_DETAILS_BY_ID_REQUESTED,
  FETCH_ENTERPRISE_DETAILS_BY_ID_SUCCESS,
  FETCH_ENTERPRISE_DETAILS_BY_ID_FAILURE,
  EDIT_ENTERPRISE_REQUESTED,
  EDIT_ENTERPRISE_SUCCESS,
  EDIT_ENTERPRISE_FAILURE,
  UPDATE_ENTERPRISE_FIELDS_STATE,
  TOGGLE_ENTERPRISE } from '../actions/enterprise-action-types';
import TimeZone from '../../config/time-zone';

const initialState = {
  createEnterpriseError: {},
  createEnterpriseStatus: null,
  editEnterpriseError: {},
  editEnterpriseStatus: null,
  enterpriseDetails: {},
  enterpriseFieldsDetails: {
    expirationDate: moment(moment().toDate()).format('DD/MM/YYYY'),
    logo: null,
    numberOfAllowedUsers: 10,
    timeFormat: 'DD/MM/YYYY',
    timeZone: TimeZone[0].name,
  },
  enterprises: [],
  fetchEnterpriseDetailsError: {},
  fetchEnterpriseDetailsStatus: null,
  fetchEnterprisesError: {},
  fetchEnterprisesStatus: null,
  switchEnterpriseDetails: {},
  switchEnterpriseError: {},
  switchEnterpriseStatus: null,
};

const updateEnterpriseList = (enterprises, payload) => {
  const itemIndex = enterprises.findIndex((item) => item.companyId === payload.companyId);

  enterprises[itemIndex] = payload;

  return [...enterprises];
};

const enterprise = (state = initialState, {
  type, payload,
}) => {
  switch (type) {
    case CREATE_ENTERPRISE_REQUESTED:
      return {
        ...state,
        createEnterpriseError: null,
        createEnterpriseStatus: null,
      };

    case CREATE_ENTERPRISE_SUCCESS:
      return {
        ...state,
        createEnterpriseError: null,
        createEnterpriseStatus: 'success',
        enterpriseFieldsDetails: {
          expirationDate: moment(moment().toDate()).format('DD/MM/YYYY'),
          logo: '',
          numberOfAllowedUsers: 10,
          timeFormat: 'DD/MM/YYYY',
          timeZone: TimeZone[0].name,
        },
      };

    case CREATE_ENTERPRISE_FAILURE:
      return {
        ...state,
        createEnterpriseError: { ...payload },
        createEnterpriseStatus: 'failure',
      };

    case TOGGLE_ENTERPRISE:
      return {
        ...state,
        switchEnterpriseDetails: payload,
      };

    case FETCH_ENTERPRISES_REQUESTED:
      return {
        ...state,
        fetchEnterprisesError: null,
        fetchEnterprisesStatus: null,
      };

    case FETCH_ENTERPRISES_SUCCESS:
      return {
        ...state,
        enterprises: uniqBy([...state.enterprises, ...payload], 'companyId'),
        fetchEnterprisesError: null,
        fetchEnterprisesStatus: 'success',
      };

    case FETCH_ENTERPRISES_FAILURE:
      return {
        ...state,
        fetchEnterprisesError: { ...payload },
        fetchEnterprisesStatus: 'failure',
      };

    case FETCH_ENTERPRISE_DETAILS_BY_ID_REQUESTED:
      return {
        ...state,
        fetchEnterpriseDetailsError: null,
        fetchEnterpriseDetailsStatus: null,
      };

    case FETCH_ENTERPRISE_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        enterpriseDetails: { ...payload },
        fetchEnterpriseDetailsError: null,
        fetchEnterpriseDetailsStatus: 'success',
      };

    case FETCH_ENTERPRISE_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchEnterpriseDetailsError: { ...payload },
        fetchEnterpriseDetailsStatus: 'failure',
      };

    case EDIT_ENTERPRISE_REQUESTED:
      return {
        ...state,
        editEnterpriseError: null,
        editEnterpriseStatus: null,
      };

    case EDIT_ENTERPRISE_SUCCESS:
      return {
        ...state,
        editEnterpriseError: null,
        editEnterpriseStatus: 'success',
        enterprises: updateEnterpriseList(state.enterprises, payload),
      };

    case EDIT_ENTERPRISE_FAILURE:
      return {
        ...state,
        editEnterpriseError: { ...payload },
        editEnterpriseStatus: 'failure',
      };

    case UPDATE_ENTERPRISE_FIELDS_STATE:
      return {
        ...state,
        enterpriseDetails: { ...payload },
      };

    case CREATE_ENTERPRISE_FIELDS_DETAILS:
      return {
        ...state,
        enterpriseFieldsDetails: payload,
      };

    default:
      return state;
  }
};

export default enterprise;
