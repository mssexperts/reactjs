// Note: Add the corresponding variable in webpack.config.js as well

module.exports = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'AKIAINCTUWGFEKEU6ZJQ',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || 'ezaccess-mss',
  AWS_DIR_NAME: process.env.AWS_DIR_NAME || 'surveys',
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'KxO7UnD9tW79hpfmMpDF+h8YbnY+Cdt6iJ1ashes',
  CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY || '6Ld3JnoUAAAAALbhjkak946e5kLs9Gdf1Xux3sWU',
  PORT: process.env.SERVER_PORT || 3000,
  URL_LOGIN_SERVICE: process.env.URL_LOGIN_SERVICE || 'http://112.196.35.194',
};
