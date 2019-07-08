/* eslint no-useless-escape: 0 */
import { push } from 'connected-react-router';
import Storage from './storage';
import Translate from './translate';

class User {
  getAccessToken = () => {
    const { accessToken } = Storage.get('userDetails');

    return accessToken;
  };

  userInfo = () => {
    const userDetails = Storage.get('userDetails');

    return userDetails;
  };

  adminDetails = () => {
    const adminDetails = Storage.get('adminDetails');

    return adminDetails || {};
  };

  removeAdminDetails = () => {
    Storage.delete('adminDetails');
  };

  removeUserDetailsToken = () => {
    Storage.delete('userDetails');
    Storage.delete('adminDetails');
  };

  isAuthenticated = () => {
    const userDetails = Storage.get('userDetails');

    if (!userDetails.accessToken) {
      return false;
    }

    return true;
  };

  validateEmail = (email) => {
    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
      return true;
    }

    return false;
  };

  static validatePhoneNumber(phoneNumber) {
    if (/^[0-9]+$/.test(phoneNumber)) {
      return true;
    }

    return false;
  }

  static validateGuid(guid) {
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(guid)) {
      return true;
    }

    return false;
  }

  validatePassword = (password) => {
    if (/^(?=.*?[A-Z])(?=.*[!@#$&*])(?=.*?[0-9]).{6,}$/.test(password)) {
      return true;
    }

    return false;
  };

  static validateUpperCaseChar(char) {
    if (/(?=.*[A-Z])/.test(char)) {
      return true;
    }

    return false;
  }

  static validateLowerCaseChar(char) {
    if (/(?=.*[a-z])/.test(char)) {
      return true;
    }

    return false;
  }

  static validateSpecialCaseChar(char) {
    if (/(?=.*?[!#$%&'*+-/=?^_`{|}~;])/.test(char)) {
      return true;
    }

    return false;
  }

  static validateNumericCaseChar(char) {
    if (/(?=.*[0-9])/.test(char)) {
      return true;
    }

    return false;
  }

  // Note : This is static values returned because integration of survey and crossTab is not done yet.

  static getCrossTabId() {
    return {
      crossTabId: '98fff862-1b11-4a3d-b084-1751f618ba92',
      title: 'New CrossTab',
    };
  }

  static getSurveyId() {
    return '4983e3bd-b787-4d4d-9191-85f2a674a1db';
  }

  static firstCharSpaceNotAllowed(event) {
    if (event.which === 32 && event.currentTarget.selectionStart === 0) {
      event.preventDefault();
    }
  }

  static spaceNotAllowed(event) {
    if (event.which === 32) {
      event.preventDefault();
    }
  }

  static restrictSpecialChar(event) {
    const str = String.fromCharCode(!event.charCode ? event.which : event.charCode);

    if (/^[a-z\d\-_\s]+$/i.test(str)) {
      return true;
    }

    event.preventDefault();

    return false;
  }

  dateTimeFormatter = (date) => {
    if (date) {
      const options = {
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        month: 'short',
        year: 'numeric',
      };

      return new Date(date).toLocaleDateString([], options);
    }

    return '-';
  };

  defaultLanguage = () => Storage.get('language') || 'en';

  statusFormatter = (status) => {
    if (status) return Translate.translate('active');

    return Translate.translate('inactive');
  };

  statusColorFormatter = (status) => {
    if (status) return 'green';

    return 'red';
  };

  signOut = () => {
    Storage.delete('userDetails');
    Storage.delete('adminDetails');
    push('/');
  };
}

export default User;
