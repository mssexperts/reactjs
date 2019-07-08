import React, { Component } from 'react';
import { bool, func, shape, string, number, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import FormattedMessage from './formatted-message';
import { fetchSurveyActivityList } from '../../actions/survey-action-types';
import Utils from '../../utils';
import Survey from '../../utils/survey';

const { dateFormatter } = Utils;
const { stateFormatter } = Survey;

class SurveyActivity extends Component {
  static propTypes = {
    fetchSurveyActivityList: func.isRequired,
    handleClickOutside: func.isRequired,
    isActive: bool.isRequired,
    surveyActivityList: arrayOf(
      shape({
        code: string,
        createdAt: string,
        message: string,
        name: string,
        state: number,
        surveyId: string,
      })
    ),
  };

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  dropdownMenu = React.createRef();

  handleBodyClick = (event) => {
    if (!this.dropdownMenu.current.contains(event.target)) {
      this.props.handleClickOutside(event);
    }
  };

  getStateIcon = (state) => {
    let imageName;

    switch (state) {
      case 2:
        imageName = 'in-progress.svg';
        break;
      case 3:
        imageName = 'checked.svg';
        break;
      case 4:
        imageName = 'cancel.svg';
        break;
      default:
        imageName = 'pending.svg';
    }

    return <img src={`/assets/images/${imageName}`} />;
  };

  errorMessageBlock = (data) => (
    <div className="activity-body">
      <div className="status-success">
        {JSON.parse(data).map((message, key) => (
          <p key={key}>
            <img src={'/assets/images/cancel.svg'} /> {message}
          </p>
        ))}
      </div>
    </div>
  );

  render() {
    const {
      surveyActivityList, isActive,
    } = this.props;

    return (
      <div className={`ez_right_side_bar ${isActive && 'active'}`} ref={this.dropdownMenu}>
        <div className="dropdown-content empty">
          {surveyActivityList.length ? (
            surveyActivityList.map((survey, key) => (
              <div className="activity-progress" key={key}>
                <div className="header-activity">
                  <div className="ez_colspace">
                    {this.getStateIcon(survey.state)}
                    {survey.name}
                  </div>
                  <div className="ez_colspace">{dateFormatter(survey.createdAt)}</div>
                  <div className="ez_colspace">{stateFormatter(survey.state)}</div>
                  {survey.state === 2 && (
                    <div className="ez_padding_bx">
                      <div id="myProgress">
                        <div id="myBar" />
                      </div>
                    </div>
                  )}
                  {survey.state === 4 && this.errorMessageBlock(survey.message)}
                </div>
              </div>
            ))
          ) : (
            <div className="activity-progress">
              <div className="header-activity">
                <FormattedMessage id="noSurveyUploadedYet" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ newSurvey: { surveyActivityList } }) => ({ surveyActivityList });

export default connect(
  mapStateToProps,
  { fetchSurveyActivityList }
)(SurveyActivity);
