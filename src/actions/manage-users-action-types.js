import { createAction } from 'redux-actions';

export const CREATE_GROUP = 'CREATE_GROUP';
export const createGroup = createAction(CREATE_GROUP);

export const CREATE_GROUP_REQUESTED = 'CREATE_GROUP_REQUESTED';
export const createGroupRequested = createAction(CREATE_GROUP_REQUESTED);

export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const createGroupSuccess = createAction(CREATE_GROUP_SUCCESS);

export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE';
export const createGroupFailure = createAction(CREATE_GROUP_FAILURE);

export const DELETE_GROUP = 'DELETE_GROUP';
export const deleteGroup = createAction(DELETE_GROUP);

export const DELETE_GROUP_REQUESTED = 'DELETE_GROUP_REQUESTED';
export const deleteGroupRequested = createAction(DELETE_GROUP_REQUESTED);

export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const deleteGroupSuccess = createAction(DELETE_GROUP_SUCCESS);

export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE';
export const deleteGroupFailure = createAction(DELETE_GROUP_FAILURE);

export const EDIT_GROUP = 'EDIT_GROUP';
export const editGroup = createAction(EDIT_GROUP);

export const EDIT_GROUP_REQUESTED = 'EDIT_GROUP_REQUESTED';
export const editGroupRequested = createAction(EDIT_GROUP_REQUESTED);

export const EDIT_GROUP_SUCCESS = 'EDIT_GROUP_SUCCESS';
export const editGroupSuccess = createAction(EDIT_GROUP_SUCCESS);

export const EDIT_GROUP_FAILURE = 'EDIT_GROUP_FAILURE';
export const editGroupFailure = createAction(EDIT_GROUP_FAILURE);

export const EDIT_GROUP_FIELDS_STATE = 'EDIT_GROUP_FIELDS_STATE';
export const editGroupFieldsState = createAction(EDIT_GROUP_FIELDS_STATE);

export const FETCH_GROUPS = 'FETCH_GROUPS';
export const fetchGroups = createAction(FETCH_GROUPS);

export const FETCH_GROUPS_REQUESTED = 'FETCH_GROUPS_REQUESTED';
export const fetchGroupsRequested = createAction(FETCH_GROUPS_REQUESTED);

export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
export const fetchGroupsSuccess = createAction(FETCH_GROUPS_SUCCESS);

export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE';
export const fetchGroupsFailure = createAction(FETCH_GROUPS_FAILURE);

export const FETCH_PERMISSIONS = 'FETCH_PERMISSIONS';
export const fetchPermissions = createAction(FETCH_PERMISSIONS);

export const FETCH_PERMISSIONS_REQUESTED = 'FETCH_PERMISSIONS_REQUESTED';
export const fetchPermissionsRequested = createAction(FETCH_PERMISSIONS_REQUESTED);

export const FETCH_PERMISSIONS_SUCCESS = 'FETCH_PERMISSIONS_SUCCESS';
export const fetchPermissionsSuccess = createAction(FETCH_PERMISSIONS_SUCCESS);

export const FETCH_PERMISSIONS_FAILURE = 'FETCH_PERMISSIONS_FAILURE';
export const fetchPermissionsFailure = createAction(FETCH_PERMISSIONS_FAILURE);

export const CREATE_USER = 'CREATE_USER';
export const createUser = createAction(CREATE_USER);

export const CREATE_USER_FIELDS_STATE = 'CREATE_USER_FIELDS_STATE';
export const createUserFieldsState = createAction(CREATE_USER_FIELDS_STATE);

export const CREATE_USER_REQUESTED = 'CREATE_USER_REQUESTED';
export const createUserRequested = createAction(CREATE_USER_REQUESTED);

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const createUserSuccess = createAction(CREATE_USER_SUCCESS);

export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const createUserFailure = createAction(CREATE_USER_FAILURE);

export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = createAction(FETCH_USERS);

export const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
export const fetchUsersRequested = createAction(FETCH_USERS_REQUESTED);

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const fetchUsersSuccess = createAction(FETCH_USERS_SUCCESS);

export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const fetchUsersFailure = createAction(FETCH_USERS_FAILURE);

export const FETCH_USERS_STAT = 'FETCH_USERS_STAT';
export const fetchUsersStat = createAction(FETCH_USERS_STAT);

export const FETCH_USERS_STAT_REQUESTED = 'FETCH_USERS_STAT_REQUESTED';
export const fetchUsersStatRequested = createAction(FETCH_USERS_STAT_REQUESTED);

export const FETCH_USERS_STAT_SUCCESS = 'FETCH_USERS_STAT_SUCCESS';
export const fetchUsersStatSuccess = createAction(FETCH_USERS_STAT_SUCCESS);

export const FETCH_USERS_STAT_FAILURE = 'FETCH_USERS_STAT_FAILURE';
export const fetchUsersStatFailure = createAction(FETCH_USERS_STAT_FAILURE);

export const FETCH_USERS_DASHBOARD = 'FETCH_USERS_DASHBOARD';
export const usersDashboard = createAction(FETCH_USERS_DASHBOARD);

export const FILTER_USERS = 'FILTER_USERS';
export const filterUsers = createAction(FILTER_USERS);

export const FILTER_USERS_REQUESTED = 'FILTER_USERS_REQUESTED';
export const filterUsersRequested = createAction(FILTER_USERS_REQUESTED);

export const FILTER_USERS_SUCCESS = 'FILTER_USERS_SUCCESS';
export const filterUsersSuccess = createAction(FILTER_USERS_SUCCESS);

export const FILTER_USERS_FAILURE = 'FILTER_USERS_FAILURE';
export const filterUsersFailure = createAction(FILTER_USERS_FAILURE);

export const FETCH_USER_DETAILS = 'FETCH_USER_DETAILS';
export const fetchUserDetails = createAction(FETCH_USER_DETAILS);

export const FETCH_USER_DETAILS_REQUESTED = 'FETCH_USER_DETAILS_REQUESTED';
export const fetchUserDetailsRequested = createAction(FETCH_USER_DETAILS_REQUESTED);

export const FETCH_USER_DETAILS_SUCCESS = 'FETCH_USER_DETAILS_SUCCESS';
export const fetchUserDetailsSuccess = createAction(FETCH_USER_DETAILS_SUCCESS);

export const FETCH_USER_DETAILS_FAILURE = 'FETCH_USER_DETAILS_FAILURE';
export const fetchUserDetailsFailure = createAction(FETCH_USER_DETAILS_FAILURE);

export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';
export const updateUserDetails = createAction(UPDATE_USER_DETAILS);

export const UPDATE_USER_DETAILS_REQUESTED = 'UPDATE_USER_DETAILS_REQUESTED';
export const updateUserDetailsRequested = createAction(UPDATE_USER_DETAILS_REQUESTED);

export const UPDATE_USER_DETAILS_SUCCESS = 'UPDATE_USER_DETAILS_SUCCESS';
export const updateUserDetailsSuccess = createAction(UPDATE_USER_DETAILS_SUCCESS);

export const UPDATE_USER_DETAILS_FAILURE = 'UPDATE_USER_DETAILS_FAILURE';
export const updateUserDetailsFailure = createAction(UPDATE_USER_DETAILS_FAILURE);

export const UPDATE_USER_DETAILS_PROP = 'UPDATE_USER_DETAILS_PROP';
export const updateUserDetailProp = createAction(UPDATE_USER_DETAILS_PROP);
