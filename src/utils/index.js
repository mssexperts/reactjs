import HttpHelper from './http-helper';

class Utils {
  constructor() {
    this.httpHelper = new HttpHelper();
  }

  getAll() {
    return { httpHelper: this.httpHelper };
  }

  static isEmpty = (obj) => (obj ? Object.keys(obj).length === 0 : true);

  static dateFormatter = (date) => {
    if (date) {
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };
      const createdDate = new Date(date).toLocaleDateString([], options);

      return createdDate;
    }

    return false;
  };
}

export default Utils;
