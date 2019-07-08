import { takeLatest } from 'redux-saga/effects';
import { SELECT_LOCALE } from '../actions/locale-action-types';
import Storage from '../utils/storage';

export function localeHandler({ payload }) {
  Storage.save('language', payload);
}

function* locale() {
  yield takeLatest(SELECT_LOCALE, localeHandler);
}

export default locale;
