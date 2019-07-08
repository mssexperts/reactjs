/* eslint no-param-reassign: 0 */

import uniqBy from 'lodash/uniqBy';

import { CREATE_USER_FIELDS_STATE,
  CREATE_GROUP_REQUESTED,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  DELETE_GROUP_REQUESTED,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE,
  EDIT_GROUP_REQUESTED,
  EDIT_GROUP_SUCCESS,
  EDIT_GROUP_FAILURE,
  CREATE_USER_REQUESTED,
  EDIT_GROUP_FIELDS_STATE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  FETCH_GROUPS_REQUESTED,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAILURE,
  FETCH_PERMISSIONS_REQUESTED,
  FETCH_PERMISSIONS_SUCCESS,
  FETCH_PERMISSIONS_FAILURE,
  FETCH_USERS_REQUESTED,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_STAT_REQUESTED,
  FETCH_USERS_STAT_SUCCESS,
  FETCH_USERS_STAT_FAILURE,
  FILTER_USERS_REQUESTED,
  FILTER_USERS_SUCCESS,
  FILTER_USERS_FAILURE,
  FETCH_USER_DETAILS_REQUESTED,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  UPDATE_USER_DETAILS_REQUESTED,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  UPDATE_USER_DETAILS_PROP } from '../actions/manage-users-action-types';

const initialState = {
  createGroupError: {},
  createGroupStatus: null,
  createUserError: {},
  createUserFieldsStateValue: {},
  createUserStatus: null,
  deleteGroupStatus: null,
  deleteUserError: {},
  editGroupError: {},
  editGroupFieldsStateValue: {},
  editGroupStatus: null,
  fetchGroupError: {},
  fetchGroupStatus: null,
  fetchPermissionsError: {},
  fetchPermissionsStatus: null,
  fetchUserDetailsError: null,
  fetchUserDetailsStatus: {},
  fetchUsersError: {},
  fetchUsersListStatus: null,
  fetchUsersStatError: {},
  fetchUsersStatStatus: null,
  filterUsersStatError: {},
  filterUsersStatStatus: null,
  groups: [],
  loginUserDetails: {},
  permissionDefaultValue: '',
  permissions: [],
  updateUserDetailsError: {},
  updateUserDetailsStatus: null,
  userDetails: {},
  users: [],
  usersStat: {
    activeUsers: 0,
    inActiveUsers: 0,
  },
};

const updatedGroupList = (groups) => groups.map((item) => ({
  ...item,
  value: item.userGroupId,
}));

const updatedPermissionList = (permissions) => permissions.map((item) => ({
  ...item,
  value: item.userPermissionId,
}));

const updateGroups = (groups, payload) => {
  const itemIndex = groups.findIndex((item) => item.value === payload.userGroupId);

  groups[itemIndex] = {
    ...groups[itemIndex],
    name: payload.name,
  };

  return [...groups];
};

const ManageUsers = (state = initialState, {
  type, payload,
}) => {
  switch (type) {
    case CREATE_USER_FIELDS_STATE:
      return {
        ...state,
        createUserFieldsStateValue: payload,
      };

    case CREATE_GROUP_REQUESTED:
      return {
        ...state,
        createGroupError: null,
        createGroupStatus: 'creating',
      };

    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        createGroupError: null,
        createGroupStatus: 'success',
      };

    case CREATE_GROUP_FAILURE:
      return {
        ...state,
        createGroupError: { ...payload },
        createGroupStatus: 'failure',
      };

    case DELETE_GROUP_REQUESTED:
      return {
        ...state,
        deleteGroupError: null,
        deleteGroupStatus: null,
      };

    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        deleteGroupError: null,
        deleteGroupStatus: 'success',
        editGroupFieldsStateValue: {
          ...state.editGroupFieldsStateValue,
          selectedOption: null,
        },
        groups: state.groups.filter((group) => group.userGroupId !== payload),
      };

    case DELETE_GROUP_FAILURE:
      return {
        ...state,
        deleteGroupError: { ...payload },
        deleteGroupStatus: 'failure',
      };

    case EDIT_GROUP_FIELDS_STATE:
      return {
        ...state,
        editGroupFieldsStateValue: payload,
      };

    case EDIT_GROUP_REQUESTED:
      return {
        ...state,
        editGroupError: null,
        editroupStatus: null,
      };

    case EDIT_GROUP_SUCCESS:
      return {
        ...state,
        editGroupError: null,
        editGroupFieldsStateValue: {
          ...state.editGroupFieldsStateValue,
          name: '',
          selectedOption: null,
        },
        editGroupStatus: 'success',
        groups: updateGroups([...state.groups], payload),
      };

    case EDIT_GROUP_FAILURE:
      return {
        ...state,
        editGroupError: { ...payload },
        editGroupStatus: 'failure',
      };

    case FETCH_GROUPS_REQUESTED:
      return {
        ...state,
        fetchGroupError: null,
        fetchGroupStatus: null,
      };

    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        fetchGroupError: null,
        fetchGroupStatus: 'success',
        groups: updatedGroupList(payload),
      };

    case FETCH_GROUPS_FAILURE:
      return {
        ...state,
        fetchGroupError: { ...payload },
        fetchGroupStatus: 'failure',
      };

    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        fetchUsersError: null,
        fetchUsersListStatus: null,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        fetchUsersError: null,
        fetchUsersListStatus: 'success',
        users: uniqBy([...state, ...payload], 'userId'),
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        fetchUsersError: { ...payload },
        fetchUsersListStatus: 'failure',
      };

    case FETCH_PERMISSIONS_REQUESTED:
      return {
        ...state,
        fetchPermissionsError: null,
        fetchPermissionsStatus: null,
      };

    case FETCH_PERMISSIONS_SUCCESS:
      return {
        ...state,
        createUserFieldsStateValue: { userPermissionId: payload.length ? payload[0].userPermissionId : '' },
        fetchPermissionsError: null,
        fetchPermissionsStatus: 'success',
        permissionDefaultValue: payload.length ? payload[0].userPermissionId : '',
        permissions: updatedPermissionList(payload),
      };

    case FETCH_PERMISSIONS_FAILURE:
      return {
        ...state,
        fetchPermissionsError: { ...payload },
        fetchPermissionsStatus: 'failure',
      };

    case CREATE_USER_REQUESTED:
      return {
        ...state,
        createUserError: null,
        createUserStatus: null,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createUserError: null,
        createUserFieldsStateValue: {},
        createUserStatus: 'success',
      };

    case CREATE_USER_FAILURE:
      return {
        ...state,
        createUserError: { ...payload },
        createUserStatus: 'failure',
      };

    case FETCH_USERS_STAT_REQUESTED:
      return {
        ...state,
        fetchUsersStatError: null,
        fetchUsersStatStatus: null,
      };

    case FETCH_USERS_STAT_SUCCESS:
      return {
        ...state,
        fetchUsersStatError: null,
        fetchUsersStatStatus: 'success',
        usersStat: payload,
      };

    case FETCH_USERS_STAT_FAILURE:
      return {
        ...state,
        fetchUsersStatError: { ...payload },
        fetchUsersStatStatus: 'failure',
      };

    case FILTER_USERS_REQUESTED:
      return {
        ...state,
        filterUseListStatus: null,
        filterUsersError: null,
      };

    case FILTER_USERS_SUCCESS:
      return {
        ...state,
        filterUseListStatus: 'success',
        filterUsersError: null,
        users: uniqBy([...state, ...payload], 'userId'),
      };

    case FILTER_USERS_FAILURE:
      return {
        ...state,
        filterUseListStatus: 'failure',
        filterUsersError: { ...payload },
      };

    case FETCH_USER_DETAILS_REQUESTED:
      return {
        ...state,
        fetchUserDetailsError: null,
        fetchUserDetailsStatus: null,
      };

    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        fetchUserDetailsError: null,
        fetchUserDetailsStatus: 'success',
        userDetails: payload,
      };

    case FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        fetchUserDetailsError: { ...payload },
        fetchUserDetailsStatus: 'failure',
      };

    case UPDATE_USER_DETAILS_REQUESTED:
      return {
        ...state,
        updateUserDetailsError: null,
        updateUserDetailsStatus: null,
      };

    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        updateUserDetailsError: { ...payload },
        updateUserDetailsStatus: 'success',
      };

    case UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        updateUserDetailsError: { ...payload },
        updateUserDetailsStatus: 'failure',
      };

    case UPDATE_USER_DETAILS_PROP:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...payload,
        },
      };

    default:
      return state;
  }
};

export default ManageUsers;
