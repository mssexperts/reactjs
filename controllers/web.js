/* eslint class-methods-use-this: ["error", { "exceptMethods": ["clientPortal"] }] */

const {
  CAPTCHA_SITE_KEY, URL_LOGIN_SERVICE,
} = require('../config');

class Web {
  clientPortal(req, res) {
    return res.render('index', {
      CAPTCHA_SITE_KEY,
      URL_LOGIN_SERVICE,
    });
  }
}

module.exports = Web;
