import React, { Component, Fragment } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FormattedMessage from '../common/formatted-message';
import { forgotPassword } from '../../actions/user-authentication-action-types';
import TextInput from '../common/text-input';
import User from '../../utils/user';

const { validateEmail } = new User();

class ForgotPassword extends Component {
  static propTypes = { forgotPassword: func.isRequired };

  state = {
    email: '',
    error: '',
  };

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;
    const { email } = this.state;

    this.setState({
      email,
      [name]: value,
    });
  };

  handleKeyPress = (event) => {
    User.spaceNotAllowed(event);
  };

  validateEmail = () => {
    const { email } = this.state;
    let isValid = true;

    if (!email) {
      this.setState({ error: <FormattedMessage id="emptyEmailValidation" /> });
      isValid = false;
    } else if (!validateEmail(email)) {
      this.setState({ error: <FormattedMessage id="emailValidation" /> });
      isValid = false;
    } else {
      this.setState({ error: '' });
    }

    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;

    const isValid = this.validateEmail();

    if (isValid) {
      this.props.forgotPassword({ email });

      this.setState({ email: '' });
    }
  };

  render() {
    const {
      email, error,
    } = this.state;

    return (
      <Fragment>
        <h2 className="ez-text-center">
          <FormattedMessage id="forgotPassword" />
        </h2>
        <p className="ez-text-center text-color">
          <FormattedMessage id="resetPasswordNotification" />
        </p>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            labelName="email"
            name="email"
            placeHolder="enterEmailAddress"
            stringMaxLength={255}
            stringMinLength={6}
            type="text"
            value={email}
          />
          {!!error && <label className="ez-label ez-error">{error}</label>}
          <button className="ez-button ez-top-margin">
            <FormattedMessage id="sendInstructions" />
          </button>
          <Link className="ez-text-center contact" to="/">
            <FormattedMessage id="returnLoginLink" />
          </Link>
          <p className="ez-text-center ez-text-forgot-bottom">
            <FormattedMessage id="contactAdministator" />
          </p>
        </form>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { forgotPassword }
)(ForgotPassword);
