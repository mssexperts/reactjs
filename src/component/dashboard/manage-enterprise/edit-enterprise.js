import React, { Component } from 'react';
import { bool, func, shape, string, number } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import moment from 'moment';
import { uploadFile } from 'react-s3';
import { editEnterprise, fetchEnterpriseDetailsById, updateEnterpriseFieldsState, toggleEnterprise } from '../../../actions/enterprise-action-types';
import TextInput from '../../common/text-input';
import FileUploadS3 from '../../common/file-upload-s-3';
import FormattedMessage from '../../common/formatted-message';
import dateFormat from '../../../../config/date-format';
import Calender from '../../common/calender';
import DropDown from '../../common/dropdown';
import TimeZone from '../../../../config/time-zone';
import { statusOptions } from '../../../../config/dropdown';
import User from '../../../utils/user';
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_DIR_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '../../../../config';

const config = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  bucketName: AWS_BUCKET_NAME,
  dirName: AWS_DIR_NAME,
  region: AWS_REGION,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};

const { userInfo } = new User();

class EditEnterprise extends Component {
  static propTypes = {
    editEnterprise: func.isRequired,
    enterpriseDetails: shape({
      companyId: string,
      expirationDate: string,
      isActive: bool,
      logo: string,
      name: string,
      numberOfAllowedUsers: number,
      timeFormat: string,
      timeZone: string,
    }).isRequired,
    fetchEnterpriseDetailsById: func.isRequired,
    match: shape({ params: { id: string.isRequired } }),
    switchEnterpriseDetails: shape({
      logo: string,
      name: string,
    }).isRequired,
    toggleEnterprise: func.isRequired,
    updateEnterpriseFieldsState: func.isRequired,
  };

  state = {
    errors: {},
    loader: false,
    uploadSurveyError: '',
  };

  componentDidMount() {
    this.props.fetchEnterpriseDetailsById({
      companyId: this.getParams(),
      method: 'editEnterprise',
    });
  }

  getParams = () => {
    const { match: { params } } = this.props;

    return params.id;
  };

  handleChange = (event) => {
    if (event.target) {
      const {
        name, value,
      } = event.target;

      if (name === 'file') {
        this.fileUploader(event);
      } else {
        const { enterpriseDetails } = this.props;

        const updatedEnterpriseDetails = {
          ...enterpriseDetails,
          [name]: value,
        };

        this.props.updateEnterpriseFieldsState(updatedEnterpriseDetails);
      }
    } else {
      this.dateField(event);
    }
  };

  dateField = ({ value }) => {
    const selectedDate = moment(value.toDate()).format('DD/MM/YYYY');

    const { enterpriseDetails } = this.props;

    this.props.updateEnterpriseFieldsState({
      ...enterpriseDetails,
      expirationDate: selectedDate,
    });
  };

  fileUploader = (event) => {
    const file = event.target.files[0];

    const { enterpriseDetails } = this.props;

    if (file.size < 993 * 1000) {
      this.setState({
        errors: {},
        loader: true,
      });
      uploadFile(file, config)
        .then((data) => {
          const updatedEnterpriseDetails = {
            ...enterpriseDetails,
            logo: data.location,
          };

          this.props.updateEnterpriseFieldsState(updatedEnterpriseDetails);

          this.setState({ loader: false });
        })
        .catch((err) => {
          this.setState({ uploadSurveyError: err });
        });
    } else {
      this.setState({ errors: { fileSize: <FormattedMessage id="uploadedFileSize" /> } });
    }
  };

  validateFields() {
    const { enterpriseDetails } = this.props;

    const {
      name, expirationDate,
    } = enterpriseDetails;

    const errors = {};
    let isValid = true;

    if (!name) {
      isValid = false;
      errors.name = 'emptyName';
    }

    if (moment(expirationDate, 'DD/MM/YYYY').isBefore(moment())) {
      isValid = false;
      errors.expirationDate = 'futureDateValidation';
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
    User.firstCharSpaceNotAllowed(event);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { enterpriseDetails } = this.props;

    const isValid = this.validateFields();

    if (isValid) {
      delete enterpriseDetails.fileName;
      delete enterpriseDetails.fileSize;

      this.props.editEnterprise(enterpriseDetails);

      const { switchEnterpriseDetails } = this.props;
      const { companyId } = userInfo();

      if (this.getParams() === companyId) {
        this.props.toggleEnterprise(update(switchEnterpriseDetails, { $merge: { logo: enterpriseDetails.logo } }));
      }
    }
  };

  render() {
    const { enterpriseDetails } = this.props;

    const {
      errors, loader, uploadSurveyError,
    } = this.state;

    const {
      adminEmail, adminName, isActive, expirationDate, timeFormat, numberOfAllowedUsers, name, timeZone, logo,
    } = enterpriseDetails;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="ez-form-outer">
          <div className="ez-form-heading">
            <Link to="/manage-users/manage-enterprise">
              <img src={'/assets/images/left-arrow-back.svg'} />
              <FormattedMessage id="manageEnterprise" />
            </Link>
            <h3>
              <FormattedMessage id="editEnterprise" />
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
              value={name || ''}
            />
            {errors.name && this.showError(errors.name)}
            <div className="ez-outer-enterprise text-field">
              <FileUploadS3 className="ez-upload-enterprise-logo" handleChange={this.handleChange} loader={loader} name="file" placeholder="" />
              {logo && !loader && <img src={enterpriseDetails.logo} />}
            </div>
            {uploadSurveyError && <label className="ez-label ez-error"> uploadSurveyError</label>}
            {errors.fileSize && this.showError(errors.fileSize)}
            <div className="text-field ez-time">
              <DropDown handleChange={this.handleChange} labelName="enterTimeFormat" name="timeFormat" options={dateFormat} value={timeFormat} />
              <DropDown handleChange={this.handleChange} labelName="timeZone" name="timeZone" options={TimeZone} value={timeZone} />
            </div>
            {errors.timeZone && this.showError(errors.timeZone)}
            <Calender dateField={this.handleChange} name="calender" startDate={expirationDate || ''} />
            {errors.expirationDate && this.showError(errors.expirationDate)}
          </div>
          <div className="ez-right-form">
            <TextInput
              handleChange={this.handleChange}
              handleKeyPress={this.handleKeyPress}
              labelName="numberOfUserLicenses"
              minValue={0}
              name="numberOfAllowedUsers"
              type="number"
              value={`${numberOfAllowedUsers}` || 10}
            />
            <div className="text-field" />
            <DropDown handleChange={this.handleChange} labelName="status" name="isActive" options={statusOptions} value={isActive} />
            <div className="text-field" />

            <div className="text-field">
              <label className="ez-label ez-top-margin ez-capitalize">
                <FormattedMessage id="name" />
              </label>
              <p>{adminName}</p>
            </div>
            <div className="text-field">
              <label className="ez-label ez-top-margin ez-capitalize">
                <FormattedMessage id="email" />
              </label>
              <p>{adminEmail}</p>
            </div>
          </div>
          <div className="ez-form-button ez-text-right">
            <button className="ez-button">
              <FormattedMessage id="update" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({
  enterprise: {
    enterpriseDetails, switchEnterpriseDetails,
  },
}) => ({
  enterpriseDetails,
  switchEnterpriseDetails,
});

export default connect(
  mapStateToProps,
  {
    editEnterprise,
    fetchEnterpriseDetailsById,
    toggleEnterprise,
    updateEnterpriseFieldsState,
  }
)(EditEnterprise);
