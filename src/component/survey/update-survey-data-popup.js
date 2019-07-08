import React, { Component } from 'react';
import { func, string, bool, shape } from 'prop-types';
import { connect } from 'react-redux';
import { uploadFile } from 'react-s3';
import FileUploadS3 from '../common/file-upload-s-3';
import FormattedMessage from '../common/formatted-message';
import { updateSurveyDataAction, updateSurveyDetailsAction, updateSurveyDataActionRequested } from '../../actions/survey-action-types';
import { notificationRequested } from '../../actions/notification-action-types';
import Utils from '../../utils';
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_DIR_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '../../../config';
import Survey from '../../utils/survey';

const { isEmpty } = Utils;

const config = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  bucketName: AWS_BUCKET_NAME,
  dirName: AWS_DIR_NAME,
  region: AWS_REGION,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};

const { supportedFileFormat } = Survey;

class UpdateSurveyDataPopup extends Component {
  static propTypes = {
    action: func,
    id: string,
    notificationRequested: func.isRequired,
    updateSurveyDataAction: func.isRequired,
    updateSurveyDataActionRequested: func.isRequired,
    updateSurveyDataError: string,
    updateSurveyDataSuccess: bool,
    updateSurveyDetails: shape({
      isFileContainHeader: bool,
      surveyFileName: string,
    }),
    updateSurveyDetailsAction: func.isRequired,
  };

  state = {
    isUploadSurveyActive: false,
    showUploadLoader: false,
    surveyFileError: false,
    uploadSurveyFileError: {},
    uploadSurveyFileValue: '',
  };

  componentDidMount() {
    this.props.updateSurveyDataActionRequested();
  }

  componentDidUpdate(prevProps) {
    const { updateSurveyDataSuccess: prevUpdateSurveyDataSuccess } = prevProps;
    const {
      action, updateSurveyDataSuccess,
    } = this.props;

    if (prevUpdateSurveyDataSuccess !== updateSurveyDataSuccess) {
      action();
      this.props.updateSurveyDetailsAction({
        isFileContainHeader: false,
        surveyFileName: '',
      });
      this.props.notificationRequested({
        notificationMessage: 'newSurveyUploaded',
        notificationType: 'success',
      });
    }
  }

  fileHandler = (event) => {
    const { files: file } = event.target;
    const fileExtension = file[0].name.substring(file[0].name.lastIndexOf('.') + 1);

    if (supportedFileFormat().indexOf(fileExtension) < 0) {
      this.setState({
        uploadSurveyFileError: {
          surveyMessage: <FormattedMessage id="invalidFileFormat" />,
          surveyState: true,
        },
      });
    } else {
      this.setState({
        isUploadSurveyActive: true,
        surveyFileError: false,
        uploadSurveyFileValue: file[0].name,
      });
      this.props.updateSurveyDetailsAction({ surveyFileName: '' });

      uploadFile(file[0], config)
        .then((data) => {
          this.props.updateSurveyDetailsAction({ surveyFileName: JSON.stringify(data) });
          this.setState({
            isUploadSurveyActive: false,
            uploadSurveyFileError: {
              surveyMessage: '',
              surveyState: false,
            },
          });
        })
        .catch((err) => {
          this.setState({
            uploadSurveyFileError: {
              surveyMessage: err,
              surveyState: true,
            },
          });
        });
    }
  };

  checkIsFileContainHeader = () => {
    const { updateSurveyDetails: { isFileContainHeader } } = this.props;

    this.props.updateSurveyDetailsAction({ isFileContainHeader: !isFileContainHeader });
  };

  validateFormData = () => {
    const {
      updateSurveyDetails: { surveyFileName },
      id,
    } = this.props;

    const { isUploadSurveyActive } = this.state;

    const errorValues = {};

    if (!surveyFileName) {
      errorValues.surveyFileError = true;
    }

    if (isEmpty(surveyFileName) && isUploadSurveyActive) {
      errorValues.uploadSurveyFileError = {
        surveyMessage: <FormattedMessage id="fileUploadProcessInProgress" />,
        surveyState: true,
      };
    }

    this.setState(errorValues);
    if (isEmpty(errorValues)) {
      this.setState({ showUploadLoader: true });
      this.props.updateSurveyDataAction({
        surveyId: id,
        updateSurveyDetails: this.props.updateSurveyDetails,
      });
    }
  };

  errorHandler = (type) => {
    const {
      uploadSurveyFileError: {
        surveyMessage, surveyState,
      },
      surveyFileError,
    } = this.state;

    if (surveyState && type === 'surveyFileName') {
      return surveyMessage;
    }
    if (surveyFileError && type === 'surveyFileName') {
      return 'fieldRequiredErrorMessage';
    }

    return '';
  };

  loader = () => {
    const { surveyFileName } = this.props.updateSurveyDetails;

    const { isUploadSurveyActive } = this.state;

    return isEmpty(surveyFileName) && isUploadSurveyActive;
  };

  render() {
    const {
      action, updateSurveyDataError,
    } = this.props;

    const {
      uploadSurveyFileValue, showUploadLoader,
    } = this.state;

    return (
      <div className="ez_popup">
        <h2>
          <FormattedMessage id="uploadAndMergeSurvey" />
          <img src={'/assets/images/close-white.svg'} onClick={action} />
        </h2>
        <div className="ez_popup_body">
          <div className="text-field ez-choose-btn">
            <FileUploadS3
              errorMessage={this.errorHandler('surveyFileName')}
              handleChange={this.fileHandler}
              labelName="surveyDataFile"
              loader={this.loader()}
              name="surveyFileName"
              placeholder={uploadSurveyFileValue}
            />
          </div>
          <div className="text-field ">
            <label className="ez-label ez-top-margin ">
              <input name="isFileContainHeader" type="checkbox" onChange={this.checkIsFileContainHeader} />
              <FormattedMessage id="isFileContainHeader" />
            </label>
          </div>
          {updateSurveyDataError && (
            <div className="text-field">
              <label className="ez-label ez-error">
                <img src={'assets/images/round-error-symbol.svg'} />
                {updateSurveyDataError}
              </label>
            </div>
          )}
          <div className="text-field ez-btn-place">
            <button className="ez-button ez-btn upload file-upload-btn" type="button" onClick={this.validateFormData}>
              <FormattedMessage id="upload" />
              {showUploadLoader && !updateSurveyDataError && <span className="spinner" />}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  updateSurvey: {
    updateSurveyDataError, updateSurveyDataSuccess, updateSurveyDetails,
  },
}) => ({
  updateSurveyDataError,
  updateSurveyDataSuccess,
  updateSurveyDetails,
});

export default connect(
  mapStateToProps,
  {
    notificationRequested,
    updateSurveyDataAction,
    updateSurveyDataActionRequested,
    updateSurveyDetailsAction,
  }
)(UpdateSurveyDataPopup);
