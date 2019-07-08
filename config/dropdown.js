import Translate from '../src/utils/translate';

export const languages = [
  {
    id: 1,
    name: 'english',
    src: '/assets/images/england.png',
    value: 'en',
  },
  {
    id: 2,
    name: 'french',
    src: '/assets/images/france.png',
    value: 'fr',
  },
];

export const statusOptions = [
  {
    name: Translate.translate('all'),
    value: null,
  },
  {
    name: Translate.translate('active'),
    value: 'true',
  },
  {
    name: Translate.translate('inactive'),
    value: 'false',
  },
];

export const filters = [
  {
    id: 1,
    name: Translate.translate('name'),
    value: 'Name',
  },
  {
    id: 2,
    name: Translate.translate('email'),
    value: 'email',
  },
  {
    id: 3,
    name: Translate.translate('status'),
    value: 'status',
  },
];
