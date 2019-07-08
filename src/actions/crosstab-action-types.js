import { createAction } from 'redux-actions';

export const UPDATE_CROSSTAB = 'UPDATE_CROSSTAB';
export const updateCrossTab = createAction(UPDATE_CROSSTAB);

export const UPDATE_CROSSTAB_REQUESTED = 'UPDATE_CROSSTAB_REQUESTED';
export const updateCrossTabRequested = createAction(UPDATE_CROSSTAB_REQUESTED);

export const UPDATE_CROSSTAB_SUCCESS = 'UPDATE_CROSSTAB_SUCCESS';
export const updateCrossTabSuccess = createAction(UPDATE_CROSSTAB_SUCCESS);

export const UPDATE_CROSSTAB_FAILURE = 'UPDATE_CROSSTAB_FAILURE';
export const updateCrossTabFailure = createAction(UPDATE_CROSSTAB_FAILURE);

export const FETCH_CROSSTAB_ATTRIBUTES = 'FETCH_CROSSTAB_ATTRIBUTES';
export const fetchCrosstabAttributes = createAction(FETCH_CROSSTAB_ATTRIBUTES);

export const FETCH_CROSSTAB_ATTRIBUTES_REQUESTED = 'FETCH_CROSSTAB_ATTRIBUTES_REQUESTED';
export const fetchCrosstabAttributesRequested = createAction(FETCH_CROSSTAB_ATTRIBUTES_REQUESTED);

export const FETCH_CROSSTAB_ATTRIBUTES_SUCCESS = 'FETCH_CROSSTAB_ATTRIBUTES_SUCCESS';
export const fetchCrosstabAttributesSuccess = createAction(FETCH_CROSSTAB_ATTRIBUTES_SUCCESS);

export const FETCH_CROSSTAB_ATTRIBUTES_FAILURE = 'FETCH_CROSSTAB_ATTRIBUTES_FAILURE';
export const fetchCrosstabAttributesFailure = createAction(FETCH_CROSSTAB_ATTRIBUTES_FAILURE);

export const FETCH_DICTIONARY = 'FETCH_DICTIONARY';
export const fetchDictionary = createAction(FETCH_DICTIONARY);

export const FETCH_DICTIONARY_REQUESTED = 'FETCH_DICTIONARY_REQUESTED';
export const fetchDictionaryRequested = createAction(FETCH_DICTIONARY_REQUESTED);

export const FETCH_DICTIONARY_SUCCESS = 'FETCH_DICTIONARY_SUCCESS';
export const fetchDictionarySuccess = createAction(FETCH_DICTIONARY_SUCCESS);

export const FETCH_DICTIONARY_FAILURE = 'FETCH_DICTIONARY_FAILURE';
export const fetchDictionaryFailure = createAction(FETCH_DICTIONARY_FAILURE);

export const FETCH_CROSSTAB_REPORT = 'FETCH_CROSSTAB_REPORT';
export const fetchCrosstabReport = createAction(FETCH_CROSSTAB_REPORT);

export const FETCH_CROSSTAB_REPORT_REQUESTED = 'FETCH_CROSSTAB_REPORT_REQUESTED';
export const fetchCrosstabReportRequested = createAction(FETCH_CROSSTAB_REPORT_REQUESTED);

export const FETCH_CROSSTAB_REPORT_SUCCESS = 'FETCH_CROSSTAB_REPORT_SUCCESS';
export const fetchCrosstabReportSuccess = createAction(FETCH_CROSSTAB_REPORT_SUCCESS);

export const FETCH_CROSSTAB_REPORT_FAILURE = 'FETCH_CROSSTAB_REPORT_FAILURE';
export const fetchCrosstabReportFailure = createAction(FETCH_CROSSTAB_REPORT_FAILURE);

export const UPDATE_CROSSTAB_DETAILS = 'UPDATE_CROSSTAB_DETAILS';
export const updateCrossTabDetails = createAction(UPDATE_CROSSTAB_DETAILS);

export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const updateFilters = createAction(UPDATE_FILTERS);

export const UPDATE_FILTERS_REQUESTED = 'UPDATE_FILTERS_REQUESTED';
export const updateFiltersRequested = createAction(UPDATE_FILTERS_REQUESTED);

export const UPDATE_FILTERS_SUCCESS = 'UPDATE_FILTERS_SUCCESS';
export const updateFiltersSuccess = createAction(UPDATE_FILTERS_SUCCESS);

export const UPDATE_FILTERS_FAILURE = 'UPDATE_FILTERS_FAILURE';
export const updateFiltersFailure = createAction(UPDATE_FILTERS_FAILURE);

export const FETCH_REPORT_DISPLAY_SETTINGS = 'FETCH_REPORT_DISPLAY_SETTINGS';
export const fetchReportDisplaySettings = createAction(FETCH_REPORT_DISPLAY_SETTINGS);

export const FETCH_REPORT_DISPLAY_SETTINGS_REQUESTED = 'FETCH_REPORT_DISPLAY_SETTINGS_REQUESTED';
export const fetchReportDisplaySettingsRequested = createAction(FETCH_REPORT_DISPLAY_SETTINGS_REQUESTED);

export const FETCH_REPORT_DISPLAY_SETTINGS_SUCCESS = 'FETCH_REPORT_DISPLAY_SETTINGS_SUCCESS';
export const fetchReportDisplaySettingsSuccess = createAction(FETCH_REPORT_DISPLAY_SETTINGS_SUCCESS);

export const FETCH_REPORT_DISPLAY_SETTINGS_FAILURE = 'FETCH_REPORT_DISPLAY_SETTINGS_FAILURE';
export const fetchReportDisplaySettingsFailure = createAction(FETCH_REPORT_DISPLAY_SETTINGS_FAILURE);

export const REPORT_DISPLAY_SETTINGS_HANDEL_CHANGE = 'REPORT_DISPLAY_SETTINGS_HANDEL_CHANGE';
export const reportDisplaySettingsHandelChange = createAction(REPORT_DISPLAY_SETTINGS_HANDEL_CHANGE);

export const UPDATE_REPORT_DISPLAY_SETTINGS = 'UPDATE_REPORT_DISPLAY_SETTINGS';
export const updateReportDisplaySettings = createAction(UPDATE_REPORT_DISPLAY_SETTINGS);

export const UPDATE_REPORT_DISPLAY_SETTINGS_REQUESTED = 'UPDATE_REPORT_DISPLAY_SETTINGS_REQUESTED';
export const updateReportDisplaySettingsRequested = createAction(UPDATE_REPORT_DISPLAY_SETTINGS_REQUESTED);

export const UPDATE_REPORT_DISPLAY_SETTINGS_SUCCESS = 'UPDATE_REPORT_DISPLAY_SETTINGS_SUCCESS';
export const updateReportDisplaySettingsSuccess = createAction(UPDATE_REPORT_DISPLAY_SETTINGS_SUCCESS);

export const UPDATE_REPORT_DISPLAY_SETTINGS_FAILURE = 'UPDATE_REPORT_DISPLAY_SETTINGS_FAILURE';
export const updateReportDisplaySettingsFailure = createAction(FETCH_REPORT_DISPLAY_SETTINGS_FAILURE);

export const FETCH_CROSSTAB_ALL_REPORT = 'FETCH_CROSSTAB_ALL_REPORT';
export const fetchCrosstabAllReport = createAction(FETCH_CROSSTAB_ALL_REPORT);

export const FETCH_CROSSTAB_ALL_REPORT_REQUESTED = 'FETCH_CROSSTAB_ALL_REPORT_REQUESTED';
export const fetchCrosstabAllReportRequested = createAction(FETCH_CROSSTAB_ALL_REPORT_REQUESTED);

export const FETCH_CROSSTAB_ALL_REPORT_SUCCESS = 'FETCH_CROSSTAB_ALL_REPORT_SUCCESS';
export const fetchCrosstabAllReportSuccess = createAction(FETCH_CROSSTAB_ALL_REPORT_SUCCESS);

export const FETCH_CROSSTAB_ALL_REPORT_FAILURE = 'FETCH_CROSSTAB_ALL_REPORT_FAILURE';
export const fetchCrosstabAllReportFailure = createAction(FETCH_CROSSTAB_ALL_REPORT_FAILURE);

export const FETCH_SELECTED_FILTER_CROSSTAB_REPORT = 'FETCH_SELECTED_FILTER_CROSSTAB_REPORT';
export const fetchSelectedFilterCrosstabReport = createAction(FETCH_SELECTED_FILTER_CROSSTAB_REPORT);

export const UPDATE_CROSSTAB_ALL_REPORT = 'UPDATE_CROSSTAB_ALL_REPORT';
export const updateCrosstabAllReport = createAction(UPDATE_CROSSTAB_ALL_REPORT);

export const REMOVE_FILTER_CROSSTAB_REPORT = 'REMOVE_FILTER_CROSSTAB_REPORT';
export const removeFilterCrosstabReport = createAction(REMOVE_FILTER_CROSSTAB_REPORT);

export const UPDATE_TREE_DETAILS = 'UPDATE_TREE_DETAILS';
export const updateTreeDetails = createAction(UPDATE_TREE_DETAILS);
