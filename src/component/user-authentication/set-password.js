import React, { Component, Fragment } from 'react';
import { func, shape, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FormattedMessage from '../common/formatted-message';
import { setPassword, setPasswordValidation } from '../../actions/user-authentication-action-types';
import PasswordEye from '../common/password-eye';
import User from '../../utils/user';

class SetPassword extends Component {
  static propTypes = {
    error: string,
    location: shape({ search: string.isRequired }),
    setPassword: func.isRequired,
    setPasswordValidation: func.isRequired,
    setPasswordValidationDetail: shape({
      atLeastLowerChar: bool.isRequired,
      atLeastNumericChar: bool.isRequired,
      atLeastSixChar: bool.isRequired,
      atLeastSpecialChar: bool.isRequired,
      atLeastUpperChar: bool.isRequired,
    }).isRequired,
  };

  state = { newPassword: '' };

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({ newPassword: value });
  };

  handleKeyUp = () => {
    this.validatePassword();
  };

  getParams = () => {
    const urlParams = new URLSearchParams(this.props.location.search);
    const email = urlParams.get('email');
    const verificationCode = urlParams.get('verification_code');
    const type = urlParams.get('type');

    return {
      email,
      type,
      verificationCode,
    };
  };

  validatePassword = () => {
    const { newPassword } = this.state;

    const updatedValidationDetails = {
      atLeastLowerChar: false,
      atLeastSixChar: false,
      atLeastSpecialChar: false,
      atLeastUpperChar: false,
    };

    if (newPassword.length >= 6) {
      updatedValidationDetails.atLeastSixChar = true;
    }

    if (User.validateUpperCaseChar(newPassword)) {
      updatedValidationDetails.atLeastUpperChar = true;
    }

    if (User.validateLowerCaseChar(newPassword)) {
      updatedValidationDetails.atLeastLowerChar = true;
    }

    if (User.validateSpecialCaseChar(newPassword)) {
      updatedValidationDetails.atLeastSpecialChar = true;
    }

    if (User.validateNumericCaseChar(newPassword)) {
      updatedValidationDetails.atLeastNumericChar = true;
    }

    this.props.setPasswordValidation(updatedValidationDetails);
  };

  toggleCheckbox = (isSelected) => <img src={isSelected ? '/assets/images/checked-green.svg' : '/assets/images/error.svg'} />;

  handleKeyPress = (event) => {
    User.spaceNotAllowed(event);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { newPassword } = this.state;
    const {
      email, type, verificationCode,
    } = this.getParams();

    const {
      setPasswordValidationDetail: {
        atLeastLowerChar, atLeastSixChar, atLeastSpecialChar, atLeastNumericChar, atLeastUpperChar,
      },
    } = this.props;

    if (atLeastLowerChar && atLeastSixChar && atLeastSpecialChar && atLeastUpperChar && atLeastNumericChar) {
      this.props.setPassword({
        email,
        newPassword,
        type,
        verificationCode,
      });
    }
  };

  render() {
    const { newPassword } = this.state;

    const {
      setPasswordValidationDetail: {
        atLeastSixChar, atLeastLowerChar, atLeastUpperChar, atLeastSpecialChar, atLeastNumericChar,
      },
    } = this.props;

    return (
      <Fragment>
        <h2 className="ez-text-center">
          <FormattedMessage id="setNewPasswordLabel" />
        </h2>
        <form onSubmit={this.handleSubmit}>
          <PasswordEye
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            handleKeyUp={this.handleKeyUp}
            labelName="newPassword"
            name="newPassword"
            placeHolder="enterNewPassword"
            type="password"
            value={newPassword}
          />
          <div className="password-complexity">
            <h3>
              <FormattedMessage id="passwordComplexity" />
            </h3>
            <div className="password-req">
              <p>
                <span>{this.toggleCheckbox(atLeastSixChar)}</span>
                <FormattedMessage id="atLeastSixChar" />
              </p>
              <p>
                <span>{this.toggleCheckbox(atLeastUpperChar)}</span>
                <FormattedMessage id="atLeastUpperChar" />
              </p>
              <p>
                <span>{this.toggleCheckbox(atLeastLowerChar)}</span>
                <FormattedMessage id="atLeastLowerChar" />
              </p>
              <p>
                <span>{this.toggleCheckbox(atLeastSpecialChar)}</span>
                <FormattedMessage id="atLeastSpecialChar" />
              </p>
              <p>
                <span>{this.toggleCheckbox(atLeastNumericChar)}</span>
                <FormattedMessage id="atLeastNumericChar" />
              </p>
            </div>
          </div>
          <button className="ez-button ez-top-margin">
            <FormattedMessage id="setNewPassword" />
          </button>
          <Link className="ez-text-center contact" to="/">
            <FormattedMessage id="alreadyPasswordConfirmation" />
          </Link>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ login: { setPasswordValidationDetail } }) => ({ setPasswordValidationDetail });

export default connect(
  mapStateToProps,
  {
    setPassword,
    setPasswordValidation,
  }
)(SetPassword);
