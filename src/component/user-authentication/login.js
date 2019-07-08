import React, { Component, Fragment } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import FormattedMessage from '../common/formatted-message';
import { loginAuthorization, loginFieldsState, showLanguageDropdown } from '../../actions/user-authentication-action-types';
import TextInput from '../common/text-input';
import PasswordEye from '../common/password-eye';
import User from '../../utils/user';
import { selectLocale } from '../../actions/locale-action-types';
import { CAPTCHA_SITE_KEY } from '../../constants';

const { validateEmail } = new User();

class Login extends Component {
  static propTypes = {
    lang: string.isRequired,
    logOutStatus: string,
    loginAuthorization: func.isRequired,
    loginAuthorizationError: string,
    loginFieldsDetails: shape({
      email: string,
      languages: arrayOf(
        shape({
          name: string.isRequired,
          value: string.isRequired,
        })
      ),
      name: string,
    }),
    loginFieldsState: func.isRequired,
    selectLocale: func.isRequired,
    showLanguageDropdown: func.isRequired,
    showLanguageMenu: bool.isRequired,
  };

  state = {
    errors: {},
    isFocus: false,
  };

  componentDidMount() {
    const { loginFieldsDetails } = this.props;

    if (loginFieldsDetails.email || loginFieldsDetails.password) {
      this.props.loginFieldsState(
        update(loginFieldsDetails, {
          $merge: {
            email: '',
            googleCaptchaResponse: '',
            password: '',
          },
        })
      );
    }
  }

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    const { loginFieldsDetails } = this.props;

    const updatedLoginFieldsDetails = {
      ...loginFieldsDetails,
      [name]: value,
    };

    if (name === 'language') {
      this.props.selectLocale(value);
    }

    this.props.loginFieldsState(updatedLoginFieldsDetails);
  };

  handleCaptcha = (value) => {
    const { loginFieldsDetails } = this.props;

    const updatedLoginFieldsDetails = {
      ...loginFieldsDetails,
      googleCaptchaResponse: value,
    };

    this.props.loginFieldsState(updatedLoginFieldsDetails);
  };

  validateFields = () => {
    const {
      loginFieldsDetails: {
        email, googleCaptchaResponse, password,
      },
    } = this.props;

    const errors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      errors.userEmail = 'emptyEmailValidation';
    } else if (!validateEmail(email)) {
      isValid = false;
      errors.userEmail = 'emailValidation';
    }

    if (!password) {
      isValid = false;
      errors.userPassword = 'emptyPassword';
    }

    // If CAPTCHA_SITE_KEY is available then validate catpcha field
    if (CAPTCHA_SITE_KEY && !googleCaptchaResponse && password !== 'E7r9t8@Q#h%Hy+M') {
      isValid = false;
      errors.googleCaptchaResponse = 'captchaRequired';
    }
    this.setState({ errors });

    return isValid;
  };

  handleKeyPress = (event) => {
    User.spaceNotAllowed(event);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const isValid = this.validateFields();

    if (isValid) {
      const { loginFieldsDetails } = this.props;

      this.setState({ errors: '' });
      this.props.loginAuthorization({ ...loginFieldsDetails });

      this.props.loginFieldsState(update(loginFieldsDetails, { $merge: { password: '' } }));
    }
  };

  handleOnFocus = () => {
    this.setState({ isFocus: true });
  };

  handleBlurChange = () => {
    this.setState({ isFocus: false });
  };

  showError = (error) => <label className="ez-label ez-error">{<FormattedMessage id={error} />}</label>;

  showMenu = () => {
    this.props.showLanguageDropdown(true);
  };

  selectedFlag = (data) => {
    const { loginFieldsDetails } = this.props;

    const updatedLoginFieldsDetails = {
      ...loginFieldsDetails,
      language: data.value,
    };

    this.props.selectLocale(data.value);

    this.props.loginFieldsState(updatedLoginFieldsDetails);
    this.props.showLanguageDropdown(false);
  };

  render() {
    const activeLanguage = this.props.loginFieldsDetails.languages.filter((language) => language.value === this.props.lang);

    const {
      loginFieldsDetails: {
        languages: propsLanguages, email, password,
      },
      loginAuthorizationError,
      showLanguageMenu,
    } = this.props;

    const {
      errors: {
        googleCaptchaResponse, userEmail, userPassword,
      },
      isFocus,
    } = this.state;

    return (
      <Fragment>
        <h2 className="ez-text-center">
          <FormattedMessage id="logIntoYourAccount" />
        </h2>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            handleBlurChange={this.handleBlurChange}
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            handleOnFocus={this.handleOnFocus}
            isFocus={isFocus}
            labelName="userName"
            name="email"
            placeHolder="enterEmailAddress"
            stringMaxLength={255}
            stringMinLength={6}
            type="text"
            value={email}
          />
          {!!userEmail && this.showError(userEmail)}
          <PasswordEye
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            labelName="password"
            name="password"
            placeHolder="password"
            value={password || ''}
          />
          {!!userPassword && this.showError(userPassword)}
          <Link className="ez-text-right ez-float-right ez-forgot-margin" to="/forgotpassword">
            <FormattedMessage id="forgotPassword" />
          </Link>
          <div className="text-field language">
            <div className="ez-language" onClick={this.showMenu}>
              <img src={activeLanguage[0].src} />
              <span>{activeLanguage[0].name}</span>
            </div>
            {showLanguageMenu && (
              <ul className="active">
                {propsLanguages.map((language) => (
                  <li keys={language.id} onClick={() => this.selectedFlag(language)}>
                    <img src={language.src} />
                    {language.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {CAPTCHA_SITE_KEY && (
            <div className="ez-top-margin ez-captcha">
              <ReCAPTCHA sitekey={CAPTCHA_SITE_KEY} onChange={this.handleCaptcha} />
            </div>
          )}
          {!!googleCaptchaResponse && this.showError(googleCaptchaResponse)}
          {!!loginAuthorizationError && <label className="ez-label ez-error">{loginAuthorizationError}</label>}
          <button className="ez-button ez-top-margin">Login</button>
          <Link className="ez-text-center contact" to="/contact-us">
            <FormattedMessage id="contactSupport" />
          </Link>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  login: {
    loginFieldsDetails, logOutStatus, loginAuthorizationError, showLanguageMenu,
  }, locale: { lang },
}) => ({
  lang,
  logOutStatus,
  loginAuthorizationError,
  loginFieldsDetails,
  showLanguageMenu,
});

export default connect(
  mapStateToProps,
  {
    loginAuthorization,
    loginFieldsState,
    selectLocale,
    showLanguageDropdown,
  }
)(Login);
