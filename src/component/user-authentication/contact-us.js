import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import TextInput from '../common/text-input';
import TextArea from '../common/text-area';
import FormattedMessage from '../common/formatted-message';
import { contactUs, contactDetails } from '../../actions/user-authentication-action-types';
import companyDetails from '../../../config/company-details';
import User from '../../utils/user';

const { validateEmail } = new User();

class ContactUs extends Component {
  static propTypes = {
    contactDetails: func.isRequired,
    contactFieldDetails: shape({
      email: string,
      message: string,
      name: string,
      phoneNumber: string,
    }),
    contactUs: func.isRequired,
    message: shape({
      notificationMessage: string,
      notificationType: string,
    }),
    notificationStatus: string,
  };

  state = { errors: {} };

  componentDidUpdate = (prevProps) => {
    const { notificationStatus: prevNotificationStatus } = prevProps;
    const {
      message, notificationStatus,
    } = this.props;

    const {
      notificationMessage, notificationType,
    } = message;

    if (prevNotificationStatus !== notificationStatus && notificationStatus === 'show') {
      switch (notificationType) {
        case 'error':
          toast.error(<FormattedMessage id={notificationMessage} />);
          break;

        case 'success':
          toast.success(<FormattedMessage id={notificationMessage} />);
          break;

        case 'serverError':
          toast.error(notificationMessage);
          break;

        default:
          break;
      }
    }
  };

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    const { contactFieldDetails } = this.props;

    const updatedContactFieldDetails = {
      ...contactFieldDetails,
      [name]: value,
    };

    this.props.contactDetails(updatedContactFieldDetails);
  };

  handleKeyPress = (event) => {
    User.firstCharSpaceNotAllowed(event);
  };

  validateFields = () => {
    const {
      contactFieldDetails: {
        email, phoneNumber, message, name,
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

    if (phoneNumber) {
      if (!User.validatePhoneNumber(phoneNumber)) {
        isValid = false;
        errors.userPhoneNumber = 'phoneNumberValidation';
      } else if (phoneNumber.length > 15) {
        isValid = false;
        errors.userPhoneNumber = 'lengthValidation';
      }
    }

    if (!name) {
      isValid = false;
      errors.userName = 'emptyYourName';
    }

    if (!message) {
      isValid = false;
      errors.userMessage = 'emptyMessage';
    }

    this.setState({ errors });

    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const isValid = this.validateFields();

    const { contactFieldDetails } = this.props;

    if (isValid) {
      this.props.contactUs(contactFieldDetails);
    }
  };

  showError = (error) => (
    <label className="ez-label ez-error">
      {' '}
      <FormattedMessage id={error} />
    </label>
  );

  render() {
    const {
      contactFieldDetails: {
        name, email, phoneNumber, message,
      },
    } = this.props;

    const {
      errors: {
        userMessage, userName, userEmail, userPhoneNumber,
      },
    } = this.state;

    return (
      <div className="ez-wrapper">
        <div className="navbar-menu-wrapper ez-error-bg">
          <div className="ez-logo_div">
            <Link to="/">
              <img src={'/assets/images/logo-white.png'} />
            </Link>
          </div>
        </div>
        <div className="ez-page-full">
          <div className="ez-form-settings">
            <div className="ez-page-body-wrapper">
              <form className="ez-bg-outer" onSubmit={this.handleSubmit}>
                <div className="ez-form-outer">
                  <div className="ez-form-heading">
                    <h3>
                      <FormattedMessage id="sendUsMessage" />
                    </h3>
                    <p>
                      <FormattedMessage id="sendUsMessageDescription" />
                    </p>
                  </div>
                  <div className="form_field_upper">
                    <div className="ez-left-form">
                      <TextInput
                        handleChange={this.handleChange}
                        handleKeyPress={this.handleKeyPress}
                        labelName="yourName"
                        name="name"
                        placeHolder="enterYourName"
                        type="text"
                        value={name}
                      />
                      {!!userName && this.showError(userName)}
                      <TextInput
                        handleChange={this.handleChange}
                        handleKeyPress={this.handleKeyPress}
                        labelName="emailAddress"
                        name="email"
                        placeHolder="enterEmailAddress"
                        stringMaxLength={255}
                        stringMinLength={6}
                        type="text"
                        value={email}
                      />
                      {!!userEmail && this.showError(userEmail)}
                      <TextInput
                        handleChange={this.handleChange}
                        handleKeyPress={this.handleKeyPress}
                        labelName="phoneNumber"
                        name="phoneNumber"
                        placeHolder="enterPhoneNumber"
                        type="text"
                        value={phoneNumber}
                      />
                      {!!userPhoneNumber && this.showError(userPhoneNumber)}
                      <TextArea
                        handleChange={this.handleChange}
                        handleKeyPress={this.handleKeyPress}
                        labelName="message"
                        name="message"
                        placeHolder="enterYourMessage"
                        value={message}
                      />
                      {!!userMessage && this.showError(userMessage)}
                      <button className="ez-button ez-text-right text-field ez-top-margin ez-width-auto">
                        <FormattedMessage id="contactUs" />
                      </button>
                    </div>
                    <div className="ez-right-form">
                      <div className="ez_address">
                        <h3>
                          <FormattedMessage id="callOrScheduleDemo" />
                        </h3>
                        <ul>
                          {companyDetails.map(({
                            address, country, email: companyEmail,
                          }, key) => (
                            <li key={key}>
                              <span>
                                <img src={'/assets/images/location.svg'} />
                              </span>
                              <h3>{country}</h3>
                              <p>{address}</p>
                              <h4>{companyEmail}</h4>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="ez_address">
                    <div className="map_text">
                      <h3>
                        <FormattedMessage id="countryName" />
                      </h3>
                      <p>
                        <FormattedMessage id="companyAddress" />
                      </p>
                    </div>
                    <iframe
                      frameBorder="0"
                      height="600"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40669.3016156148!2d-74.01474076600397!3d40.745250033345016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258fe5bfb8f53%3A0x4f526827426eac8d!2s576+5th+Ave+%23903%2C+New+York%2C+NY+10036%2C+USA!5e0!3m2!1sen!2sin!4v1544619147516"
                      width="100%"
                    />
                  </div>
                  <ToastContainer autoClose={10000} closeOnClick={true} hideProgressBar={true} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  login: { contactFieldDetails }, notification: {
    message, notificationStatus, notificationType,
  },
}) => ({
  contactFieldDetails,
  message,
  notificationStatus,
  notificationType,
});

export default connect(
  mapStateToProps,
  {
    contactDetails,
    contactUs,
  }
)(ContactUs);
