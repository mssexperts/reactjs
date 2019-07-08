import config from '../../config';

const portal = document.querySelector('.app');

const validatePortalAttribute = (attribute) => (portal && portal.getAttribute(attribute) ? portal.getAttribute(attribute) : false);

export const MESSAGE_DURATION = 5000;

export const LOGIN_SERVICE_URL = validatePortalAttribute('data-login-service-url') || config.URL_LOGIN_SERVICE;

export const CAPTCHA_SITE_KEY = validatePortalAttribute('data-captcha-site-key') || config.CAPTCHA_SITE_KEY;
