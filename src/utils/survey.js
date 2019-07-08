import Translate from './translate';

class Survey {
  static stateFormatter = (state) => {
    switch (state) {
      case 2:
        return Translate.translate('inProgress');
      case 3:
        return Translate.translate('complete');
      case 4:
        return Translate.translate('error');
      default:
        return Translate.translate('pending');
    }
  };

  static supportedFileFormat = () => ['xlsx', 'txt', 'csv'];
}

export default Survey;
