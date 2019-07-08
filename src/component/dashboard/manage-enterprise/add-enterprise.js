import React, { Component } from 'react';
import { func, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { uploadFile } from 'react-s3';
import { createEnterprise, createEnterpriseFieldsDetails } from '../../../actions/enterprise-action-types';
import TextInput from '../../common/text-input';
import FileUploadS3 from '../../common/file-upload-s-3';
import FormattedMessage from '../../common/formatted-message';
import dateFormat from '../../../../config/date-format';
import Calender from '../../common/calender';
import DropDown from '../../common/dropdown';
import TimeZone from '../../../../config/time-zone';
import User from '../../../utils/user';
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_DIR_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '../../../../config';

const { validateEmail } = new User();

const config = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  bucketName: AWS_BUCKET_NAME,
  dirName: AWS_DIR_NAME,
  region: AWS_REGION,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};

class AddEnterprise extends Component {
  static propTypes = {
    createEnterprise: func.isRequired,
    createEnterpriseFieldsDetails: func.isRequired,
    enterpriseFieldsDetails: shape({
      expirationDate: string.isRequired,
      logo: string,
      numberOfAllowedUsers: number.isRequired,
      timeFormat: string.isRequired,
      timeZone: string.isRequired,
    }),
  };

  state = {
    errors: {},
    loader: false,
    uploadSurveyError: '',
  };

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    const { enterpriseFieldsDetails } = this.props;

    const updatedFieldsDetails = {
      ...enterpriseFieldsDetails,
      [name]: value || event.target.files,
    };

    this.props.createEnterpriseFieldsDetails(updatedFieldsDetails);
  };

  dateField = ({ value }) => {
    const selectedDate = moment(value.toDate()).format('DD/MM/YYYY');

    const { enterpriseFieldsDetails } = this.props;

    const updatedFieldsDetails = {
      ...enterpriseFieldsDetails,
      expirationDate: selectedDate,
    };

    this.props.createEnterpriseFieldsDetails(updatedFieldsDetails);
  };

  fileUploader = (event) => {
    const file = event.target.files[0];

    const { enterpriseFieldsDetails } = this.props;

    if (file.size < 993 * 1000) {
      this.setState({
        errors: {},
        loader: true,
      });

      uploadFile(file, config)
        .then((data) => {
          const updatedFieldsDetails = {
            ...enterpriseFieldsDetails,
            logo: data.location,
          };

          this.props.createEnterpriseFieldsDetails(updatedFieldsDetails);

          this.setState({
            loader: false,
            uploadSurveyError: '',
          });
        })
        .catch((err) => {
          this.setState({ uploadSurveyError: err });
        });
    } else {
      const updatedFieldsDetails = {
        ...enterpriseFieldsDetails,
        logo: '',
      };

      this.props.createEnterpriseFieldsDetails(updatedFieldsDetails);

      this.setState({ uploadSurveyError: <FormattedMessage id="uploadedFileSize" /> });
    }
  };

  validateFields() {
    const {
      enterpriseFieldsDetails: {
        email, expirationDate, name, timeZone, userName,
      },
    } = this.props;

    const errors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      errors.email = <FormattedMessage id="emptyEmailValidation" />;
    } else if (!validateEmail(email)) {
      isValid = false;
      errors.email = <FormattedMessage id="emailValidation" />;
    }

    if (!name) {
      isValid = false;
      errors.name = <FormattedMessage id="emptyName" />;
    }

    if (moment(expirationDate, 'DD/MM/YYYY').isBefore(moment())) {
      isValid = false;
      errors.expirationDate = 'futureDateValidation';
    }

    if (!timeZone) {
      isValid = false;
      errors.timeZone = <FormattedMessage id="emptyTimeZone" />;
    }

    if (!userName) {
      isValid = false;
      errors.userName = <FormattedMessage id="emptyName" />;
    }

    this.setState({ errors });

    return isValid;
  }

  showError = (error) => error && (
    <label className="ez-label ez-error">
      <FormattedMessage id={error} />
    </label>
  );

  handleKeyPress = (event) => {
    const { name } = event.target;

    if (name === 'email') {
      User.spaceNotAllowed(event);
    } else {
      User.firstCharSpaceNotAllowed(event);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateFields();

    const { uploadSurveyError } = this.state;

    if (isValid && !uploadSurveyError) {
      const { enterpriseFieldsDetails } = this.props;

      this.props.createEnterprise(enterpriseFieldsDetails);
    }
  };

  render() {
    const {
      errors, loader, uploadSurveyError,
    } = this.state;

    const {
      enterpriseFieldsDetails: {
        email, logo, name, timeFormat, numberOfAllowedUsers, userName, timeZone, expirationDate,
      },
    } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="ez-form-outer">
          <div className="ez-form-heading">
            <Link to="/manage-users/manage-enterprise">
              <img src={'/assets/images/left-arrow-back.svg'} />
              <FormattedMessage id="manageEnterprise" />
            </Link>
            <h3>
              <FormattedMessage id="addNewEnterprise" />
            </h3>
          </div>
          <div className="ez-left-form ez-no-overflow">
            <TextInput
              handleChange={this.handleChange}
              handleKeyPress={this.handleKeyPress}
              labelName="enterpriseName"
              name="name"
              placeHolder="enterpriseName"
              type="text"
              value={name}
            />
            {errors.name && this.showError(errors.name)}
            <div className="ez-outer-enterprise text-field">
              <FileUploadS3 className="ez-upload-enterprise-logo" handleChange={this.fileUploader} loader={loader} name="enterpriseLogo" placeholder="" />
              {logo && !loader && <img src={logo} />}
            </div>
            { uploadSurveyError && <label className="ez-label ez-error"> {uploadSurveyError}</label> }
            <div className="text-field ez-time">
              <DropDown handleChange={this.handleChange} labelName="enterTimeFormat" name="timeFormat" options={dateFormat} value={timeFormat} />
              <DropDown handleChange={this.handleChange} labelName="timeZone" name="timeZone" options={TimeZone} value={timeZone} />
            </div>
            {errors.timeZone && this.showError(errors.timeZone)}
            <Calender dateField={this.dateField} name="calender" startDate={expirationDate} />
            {errors.expirationDate && this.showError(errors.expirationDate)}
          </div>
          <div className="ez-right-form">
            <TextInput
              handleChange={this.handleChange}
              labelName="numberOfUserLicenses"
              minValue={0}
              name="numberOfAllowedUsers"
              type="number"
              value={numberOfAllowedUsers}
            />
            <div className="text-field">
              <p className="ez-text">
                <FormattedMessage id="enterpriseNameAndEmail" />
              </p>
            </div>
            <TextInput
              handleChange={this.handleChange}
              handleKeyPress={this.handleKeyPress}
              labelName="name"
              name="userName"
              placeHolder="enterName"
              type="text"
              value={userName}
            />
            {errors.userName && this.showError(errors.userName)}
            <TextInput
              handleChange={this.handleChange}
              handleKeyPress={this.handleKeyPress}
              labelName="userEmail"
              name="email"
              placeHolder="enterEmailAddress"
              stringMaxLength={255}
              stringMinLength={6}
              type="text"
              value={email}
            />
            {errors.email && this.showError(errors.email)}
          </div>
          <div className="ez-form-button ez-text-right">
            <button className="ez-button">
              <FormattedMessage id="add" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ enterprise: { enterpriseFieldsDetails } }) => ({ enterpriseFieldsDetails });

export default connect(
  mapStateToProps,
  {
    createEnterprise,
    createEnterpriseFieldsDetails,
  }
)(AddEnterprise);
