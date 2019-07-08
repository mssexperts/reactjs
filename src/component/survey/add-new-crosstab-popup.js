import React, { Component, Fragment } from 'react';
import { bool, func, shape, string, arrayOf, number } from 'prop-types';
import { connect } from 'react-redux';
import FormattedMessage from '../common/formatted-message';
import TextInput from '../common/text-input';
import { createNewCrosstab, createNewCrosstabRequested, newCrosstabDetails } from '../../actions/survey-action-types';
import Dropdown from '../common/dropdown';
import Utils from '../../utils';
import User from '../../utils/user';

const { isEmpty } = Utils;

class AddNewCrosstabPopup extends Component {
  static propTypes = {
    action: func.isRequired,
    createNewCrosstab: func.isRequired,
    createNewCrosstabRequested: func.isRequired,
    createSurveyFailure: arrayOf(
      shape({
        field: string,
        message: string,
      })
    ),
    crosstabForm: shape({
      surveyId: string,
      surveyName: string,
      title: string,
    }),
    fieldType: string.isRequired,
    isLoading: bool.isRequired,
    newCrosstabDetails: func.isRequired,
    surveyList: arrayOf(
      shape({
        code: string,
        createdAt: string,
        crosstab: arrayOf(
          shape({
            crossTabId: string,
            title: string,
          })
        ),
        description: string,
        name: string,
        respondents: number,
        surveyId: string,
      })
    ),
  };

  state = {
    nameError: '',
    surveyDropdownOptions: [],
    surveyNameError: '',
  };

  componentDidMount() {
    const { surveyList } = this.props;

    const surveyDropdownOptions = [];

    surveyList.map((survey) => surveyDropdownOptions.push({
      name: survey.name,
      value: survey.surveyId,
    }));
    this.setState({ surveyDropdownOptions });

    this.props.createNewCrosstabRequested([]);
    this.props.newCrosstabDetails({ title: '' });
  }

  errorHandler = (type) => {
    const {
      nameError, surveyNameError,
    } = this.state;

    const {
      crosstabForm: {
        surveyName, title,
      },
    } = this.props;

    if (nameError && !title && type === 'title') {
      return 'fieldRequiredErrorMessage';
    }
    if (surveyNameError && !surveyName && type === 'surveyName') {
      return 'fieldRequiredErrorMessage';
    }

    return '';
  };

  validateFormData = () => {
    const {
      crosstabForm: {
        surveyId, title,
      },
    } = this.props;

    const errorValues = {};

    if (!title) {
      errorValues.nameError = true;
    }

    if (!surveyId || !User.validateGuid(surveyId)) {
      errorValues.surveyNameError = true;
    }

    this.setState(errorValues);

    if (isEmpty(errorValues)) {
      this.props.createNewCrosstab(this.props.crosstabForm);
    }
  };

  handleKeyPress = (event) => {
    User.firstCharSpaceNotAllowed(event);
  };

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;
    const errorValues = {};

    if (name === 'name') {
      errorValues.nameError = false;
    }

    if (name === 'surveyId') {
      errorValues.surveyNameError = false;
    }

    this.setState(errorValues);

    this.props.newCrosstabDetails({ [name]: value });
  };

  render() {
    const {
      action,
      createSurveyFailure,
      crosstabForm: {
        surveyId, surveyName, title,
      },
      fieldType,
      isLoading,
    } = this.props;

    const { surveyNameError } = this.state;

    const { surveyDropdownOptions } = this.state;

    return (
      <div className="ez_popup">
        <h2>
          <FormattedMessage id="createNewCrossTab" />
          <img src={'/assets/images/close-white.svg'} onClick={action} />
        </h2>
        <div className="ez_popup_body">
          <div className="text-field">
            <TextInput
              errorMessage={this.errorHandler('title')}
              handleChange={this.handleChange}
              handleKeyPress={this.handleKeyPress}
              labelName="title"
              name="title"
              placeHolder="enterTitle"
              type="text"
              value={title}
            />
          </div>
          <div className="text-field">
            {surveyId && fieldType === 'text' ? (
              <Fragment>
                <TextInput
                  errorMessage={this.errorHandler('surveyName')}
                  handleChange={this.handleChange}
                  labelName="surveyName"
                  name="surveyName"
                  placeHolder="surveyName"
                  readonly="readonly"
                  type="text"
                  value={surveyName}
                />
                <TextInput
                  handleChange={this.handleChange}
                  labelName=""
                  name="surveyId"
                  placeHolder="surveyName"
                  readonly="readonly"
                  type="hidden"
                  value={surveyId}
                />
              </Fragment>
            ) : (
              <Fragment>
                <Dropdown
                  handleChange={this.handleChange}
                  labelName="surveyName"
                  name="surveyId"
                  options={surveyDropdownOptions}
                  placeholder="selectSurvey"
                  value={surveyId || ''}
                />
                {surveyNameError && (
                  <label className="ez-label ez-error">
                    <img src={'assets/images/round-error-symbol.svg'} />
                    <FormattedMessage id="fieldRequiredErrorMessage" />
                  </label>
                )}
              </Fragment>
            )}
          </div>
          {createSurveyFailure
            && createSurveyFailure.map((error, key) => (
              <label className="ez-label ez-error" key={key}>
                <img src={'assets/images/round-error-symbol.svg'} />
                {error.message}
              </label>
            ))}
          <div className="text-field ez-btn-place">
            <button className="ez-button ez-btn upload" type="button" onClick={this.validateFormData}>
              {isLoading && <div className="loader-button" />}
              <FormattedMessage id="create" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  newSurvey: {
    createSurveyFailure, crosstabForm, surveyList, isLoading,
  },
}) => ({
  createSurveyFailure,
  crosstabForm,
  isLoading,
  surveyList,
});

export default connect(
  mapStateToProps,
  {
    createNewCrosstab,
    createNewCrosstabRequested,
    newCrosstabDetails,
  }
)(AddNewCrosstabPopup);
