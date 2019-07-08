import React, { Component } from 'react';
import { func, bool, string, shape, number } from 'prop-types';
import { connect } from 'react-redux';
import { uploadFile } from 'react-s3';
import FormattedMessage from '../common/formatted-message';
import TextInput from '../common/text-input';
import FileUploadS3 from '../common/file-upload-s-3';
import { newSurveyDetails, checkSurveyCode, createNewSurveyRequested, createNewSurvey, fetchSurveyList } from '../../actions/survey-action-types';
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_DIR_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '../../../config';
import { notificationRequested } from '../../actions/notification-action-types';
import Utils from '../../utils';
import User from '../../utils/user';
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

class UploadSurveyPopup extends Component {
  static propTypes = {
    addSurveyDetails: func,
    checkSurveyCode: func.isRequired,
    className: string,
    createNewSurvey: func.isRequired,
    createNewSurveyError: string,
    createNewSurveyRequested: func.isRequired,
    createNewSurveySuccess: shape({
      addedBy: string,
      code: string,
      companyId: string,
      createdAt: string,
      description: string,
      name: string,
      respondents: number,
      status: bool,
      surveyId: string,
      updateAt: string,
      updatedBy: string,
    }),
    fetchSurveyList: func.isRequired,
    newSurveyDetails: func.isRequired,
    notificationRequested: func.isRequired,
    surveyCodeCheckError: bool,
    surveyCodeCheckSuccess: bool,
    surveyDetails: shape({
      description: string,
      isFileContainDictionary: bool,
      isFileContainHeader: bool,
      name: string,
      surveyCode: string,
      surveyFileName: string,
    }),
  };

  static defaultProps = { className: '' };

  state = {
    dictionaryFileType: '',
    dictionaryFileValue: '',
    isUploadDictionaryActive: false,
    isUploadSurveyActive: false,
    isVisibleFileContainDictionaryCheckbox: true,
    nameError: false,
    showUploadLoader: false,
    surveyCodeError: false,
    surveyFileError: false,
    surveyFileType: '',
    uploadDictionaryFileError: {},
    uploadSurveyFileError: {},
    uploadSurveyFileValue: '',
  };

  componentDidMount() {
    this.props.createNewSurveyRequested();
  }

  componentDidUpdate(prevProps) {
    const { createNewSurveySuccess: prevCreateNewSurveySuccess } = prevProps;
    const { createNewSurveySuccess } = this.props;

    if (prevCreateNewSurveySuccess !== createNewSurveySuccess && !isEmpty(createNewSurveySuccess)) {
      this.props.fetchSurveyList();
      this.props.notificationRequested({
        notificationMessage: 'newSurveyUploaded',
        notificationType: 'success',
      });
    }
  }

  validateFormData = () => {
    const {
      surveyCodeCheckError,
      surveyCodeCheckSuccess,
      surveyDetails: {
        name, surveyCode, surveyFileName, dictionaryFileName,
      },
    } = this.props;

    const {
      dictionaryFileType, surveyFileType, isUploadDictionaryActive, isUploadSurveyActive,
    } = this.state;

    const errorValues = {};

    if (surveyCodeCheckError || surveyCodeCheckSuccess) {
      errorValues.surveyCodeIsNotUnique = true;
    }

    if (!name) {
      errorValues.nameError = true;
    }

    if (!surveyCode) {
      errorValues.surveyCodeError = true;
    }

    if (!surveyFileName && !isUploadSurveyActive) {
      errorValues.surveyFileError = true;
    }

    if (isEmpty(surveyFileName) && isUploadSurveyActive) {
      errorValues.uploadSurveyFileError = {
        surveyMessage: <FormattedMessage id="fileUploadProcessInProgress" />,
        surveyState: true,
      };
    }

    if (isEmpty(dictionaryFileName) && isUploadDictionaryActive) {
      errorValues.uploadDictionaryFileError = {
        dictionaryMessage: <FormattedMessage id="fileUploadProcessInProgress" />,
        dictionaryState: true,
      };
    }

    if (surveyFileType === 'txt' && isEmpty(dictionaryFileName)) {
      errorValues.uploadDictionaryFileError = {
        dictionaryMessage: <FormattedMessage id="dictionaryIsRequiredForASCII" />,
        dictionaryState: true,
      };
    }

    if (surveyFileType === 'txt' && dictionaryFileType !== 'txt') {
      errorValues.uploadDictionaryFileError = {
        dictionaryMessage: <FormattedMessage id="dictionaryFileErrorMessageForTxtFile" />,
        dictionaryState: true,
      };
    }

    if ((surveyFileType === 'csv' || surveyFileType === 'xlsx') && dictionaryFileType === 'txt' && !isEmpty(dictionaryFileName)) {
      errorValues.uploadDictionaryFileError = {
        dictionaryMessage: <FormattedMessage id="dictionaryFileErrorMessageForCsvAndXlsxFile" />,
        dictionaryState: true,
      };
    }

    this.setState(errorValues);
    if (isEmpty(errorValues)) {
      this.setState({ showUploadLoader: true });
      this.props.createNewSurvey(this.props.surveyDetails);
    }
  };

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    if (name === 'name') {
      this.setState({ nameError: false });
    }

    if (name === 'surveyCode') {
      this.setState({ surveyCodeError: false });
    }

    this.props.newSurveyDetails({ [name]: name === 'surveyCode' ? value.replace(/\s|\W|[#$%^&*()]/g, '') : value });
  };

  fileHandler = (event) => {
    const {
      files: file, name: inputFieldType,
    } = event.target;

    const { surveyFileType } = this.state;

    const { surveyDetails: { isFileContainDictionary } } = this.props;

    const fileExtension = file[0].name.substring(file[0].name.lastIndexOf('.') + 1);

    if (supportedFileFormat().indexOf(fileExtension) < 0) {
      if (inputFieldType === 'surveyFileName') {
        this.setState({
          uploadSurveyFileError: {
            surveyMessage: <FormattedMessage id="invalidFileFormat" />,
            surveyState: true,
          },
        });
      }
      if (inputFieldType === 'dictionaryFileName') {
        this.setState({
          uploadDictionaryFileError: {
            dictionaryMessage: <FormattedMessage id="invalidFileFormat" />,
            dictionaryState: true,
          },
        });
      }
    } else {
      let processDictionary = true;

      if (inputFieldType === 'dictionaryFileName') {
        if (fileExtension === 'txt' && surveyFileType !== 'txt') {
          processDictionary = false;
          this.setState({
            isUploadDictionaryActive: false,
            uploadDictionaryFileError: {
              dictionaryMessage: <FormattedMessage id="dictionaryFileErrorMessageForTxtFile" />,
              dictionaryState: true,
            },
          });
        }

        if ((surveyFileType === 'csv' || surveyFileType === 'xlsx') && fileExtension === 'txt') {
          processDictionary = false;
          this.setState({
            isUploadDictionaryActive: false,
            uploadDictionaryFileError: {
              dictionaryMessage: <FormattedMessage id="dictionaryFileErrorMessageForCsvAndXlsxFile" />,
              dictionaryState: true,
            },
          });
        }

        if (processDictionary) {
          this.setState({
            dictionaryFileType: fileExtension,
            dictionaryFileValue: file[0].name,
            isUploadDictionaryActive: true,
          });

          this.props.newSurveyDetails({ dictionaryFileName: '' });
        }
      }

      if (inputFieldType === 'surveyFileName') {
        this.setState({
          isUploadSurveyActive: true,
          isVisibleFileContainDictionaryCheckbox: fileExtension !== 'txt',
          surveyFileError: false,
          surveyFileType: fileExtension,
          uploadSurveyFileValue: file[0].name,
        });

        this.props.newSurveyDetails({
          isFileContainDictionary: fileExtension === 'txt' ? false : isFileContainDictionary,
          surveyFileName: '',
        });
      }
      if (processDictionary) {
        uploadFile(file[0], config)
          .then((data) => {
            this.props.newSurveyDetails(
              inputFieldType === 'surveyFileName' ? { surveyFileName: JSON.stringify(data) } : { dictionaryFileName: JSON.stringify(data) }
            );
            if (inputFieldType === 'surveyFileName') {
              this.setState({
                isUploadSurveyActive: false,
                uploadSurveyFileError: {
                  surveyMessage: '',
                  surveyState: false,
                },
              });
            }
            if (inputFieldType === 'dictionaryFileName') {
              this.setState({
                isUploadDictionaryActive: false,
                uploadDictionaryFileError: {
                  dictionaryMessage: '',
                  dictionaryState: false,
                },
              });
            }
          })
          .catch((err) => {
            if (inputFieldType === 'surveyFileName') {
              this.setState({
                uploadSurveyFileError: {
                  surveyMessage: err,
                  surveyState: true,
                },
              });
            }
            if (inputFieldType === 'dictionaryFileName') {
              this.setState({
                uploadDictionaryFileError: {
                  dictionaryMessage: err,
                  dictionaryState: true,
                },
              });
            }
          });
      }
    }
  };

  handleKeyPress = (event) => {
    User.firstCharSpaceNotAllowed(event);

    if (event.target.name === 'name') {
      User.restrictSpecialChar(event);
    }
  };

  checkIsFileContainDictionary = () => {
    const { surveyDetails: { isFileContainDictionary } } = this.props;

    this.props.newSurveyDetails({ isFileContainDictionary: !isFileContainDictionary });
  };

  checkIsWeighted = () => {
    const { surveyDetails: { isWeighted } } = this.props;

    this.props.newSurveyDetails({ isWeighted: !isWeighted });
  };

  focusChange = () => {
    const { surveyCode } = this.props.surveyDetails;

    this.props.checkSurveyCode(surveyCode);
  };

  errorHandler = (type) => {
    const {
      nameError,
      surveyCodeError,
      uploadSurveyFileError: {
        surveyMessage, surveyState,
      },
      surveyFileError,
      uploadDictionaryFileError: {
        dictionaryMessage, dictionaryState,
      },
    } = this.state;

    const {
      surveyCodeCheckError, surveyCodeCheckSuccess,
    } = this.props;

    if (nameError && type === 'name') {
      return 'fieldRequiredErrorMessage';
    }
    if (surveyCodeError && type === 'surveyCode') {
      return 'fieldRequiredErrorMessage';
    }
    if (surveyCodeCheckError && type === 'surveyCode') {
      return 'serverIsNotProcessingRequest';
    }
    if (surveyCodeCheckSuccess && type === 'surveyCode') {
      return 'surveyCodeIsNotUnique';
    }
    if (surveyState && type === 'surveyFileName') {
      return surveyMessage;
    }
    if (surveyFileError && type === 'surveyFileName') {
      return 'fieldRequiredErrorMessage';
    }
    if (dictionaryState && type === 'dictionaryFileName') {
      return dictionaryMessage;
    }

    return '';
  };

  loader = (type) => {
    const {
      surveyFileName, dictionaryFileName,
    } = this.props.surveyDetails;

    const {
      isUploadSurveyActive, isUploadDictionaryActive,
    } = this.state;

    if (type === 'surveyFileName') {
      return isEmpty(surveyFileName) && isUploadSurveyActive;
    }

    return isEmpty(dictionaryFileName) && isUploadDictionaryActive;
  };

  checkIsFileContainHeader = () => {
    const { surveyDetails: { isFileContainHeader } } = this.props;

    this.props.newSurveyDetails({ isFileContainHeader: !isFileContainHeader });
  };

  render() {
    const {
      className, surveyDetails, createNewSurveyError,
    } = this.props;

    const {
      name, surveyCode, isFileContainDictionary,
    } = surveyDetails;

    const {
      dictionaryFileValue, isVisibleFileContainDictionaryCheckbox, uploadSurveyFileValue, showUploadLoader,
    } = this.state;

    return (
      <div className={className}>
        <div className="ez_popup">
          <div className="ez-headings">
            <h3>
              <FormattedMessage id="uploadSurvey" />
            </h3>
          </div>
          <div className="ez_popup_body">
            <div className="text-field">
              <TextInput
                errorMessage={this.errorHandler('name')}
                handleChange={this.handleChange}
                handleKeyPress={this.handleKeyPress}
                labelName="surveyName"
                name="name"
                placeHolder="enterSurveyName"
                type="text"
                value={name}
              />
            </div>
            <div className="text-field">
              <TextInput
                errorMessage={this.errorHandler('surveyCode')}
                handleBlurChange={this.focusChange}
                handleChange={this.handleChange}
                handleKeyPress={this.handleKeyPress}
                labelName="surveyCode"
                name="surveyCode"
                placeHolder="enterSurveyCode"
                type="text"
                value={surveyCode}
              />
            </div>
            <div className="text-field ez-choose-btn">
              <FileUploadS3
                errorMessage={this.errorHandler('surveyFileName')}
                handleChange={this.fileHandler}
                labelName="surveyDataFile"
                loader={this.loader('surveyFileName')}
                name="surveyFileName"
                placeholder={uploadSurveyFileValue}
              />
            </div>
            <div className="text-field ">
              <div className="ez-label ez-top-margin ">
                <input name="isWeighted" type="checkbox" onChange={this.checkIsWeighted} />
                <FormattedMessage id="surveyIsWeighted" />
              </div>
            </div>
            {isVisibleFileContainDictionaryCheckbox && (
              <div className="text-field ">
                <div className="ez-label ez-top-margin ">
                  <input name="isFileContainDictionary" type="checkbox" onChange={this.checkIsFileContainDictionary} />
                  <FormattedMessage id="fileContainDictionary" />
                </div>
              </div>
            )}
            <div className="text-field ">
              <div className="ez-label ez-top-margin ">
                <input name="isFileContainHeader" type="checkbox" onChange={this.checkIsFileContainHeader} />
                <FormattedMessage id="isFileContainHeader" />
              </div>
            </div>
            {!isFileContainDictionary && (
              <div className="text-field ez-choose-btn">
                <FileUploadS3
                  errorMessage={this.errorHandler('dictionaryFileName')}
                  handleChange={this.fileHandler}
                  labelName="surveyDictionaryFile"
                  loader={this.loader('dictionaryFileName')}
                  name="dictionaryFileName"
                  placeholder={dictionaryFileValue}
                />
              </div>
            )}
            <div className="text-field">
              <label className="ez-label ez-top-margin ">
                <FormattedMessage id="surveyDescription" />
              </label>
              <textarea className="ez-input" name="description" onBlur={this.handleChange} />
            </div>
            {createNewSurveyError && (
              <div className="text-field">
                <label className="ez-label ez-error">
                  <img src={'assets/images/round-error-symbol.svg'} />
                  {createNewSurveyError}
                </label>
              </div>
            )}
            <div className="text-field ez-btn-place">
              <button className="ez-button ez-btn upload file-upload-btn" type="button" onClick={this.validateFormData}>
                <FormattedMessage id="upload" />
                {showUploadLoader && !createNewSurveyError && <span className="spinner" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  newSurvey: {
    createNewSurveyError, createNewSurveySuccess, surveyCodeCheckError, surveyCodeCheckSuccess, surveyDetails,
  },
}) => ({
  createNewSurveyError,
  createNewSurveySuccess,
  surveyCodeCheckError,
  surveyCodeCheckSuccess,
  surveyDetails,
});

export default connect(
  mapStateToProps,
  {
    checkSurveyCode,
    createNewSurvey,
    createNewSurveyRequested,
    fetchSurveyList,
    newSurveyDetails,
    notificationRequested,
  }
)(UploadSurveyPopup);
