import React, { Component } from 'react';
import { func, arrayOf, shape, string, number } from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import FormattedMessage from '../common/formatted-message';
import DeletePopup from './delete-popup';
import { deleteCrosstab, openCrosstabAction } from '../../actions/survey-action-types';

class CrosstabListPopup extends Component {
  static propTypes = {
    action: func.isRequired,
    deleteCrosstab: func.isRequired,
    id: string,
    intl: intlShape.isRequired,
    openCrosstabAction: func.isRequired,
    surveyList: arrayOf(
      shape({
        code: string,
        createdAt: string,
        crosstab: arrayOf(
          shape({
            columns: string,
            crossTabId: string,
            filters: string,
            rows: string,
            surveyId: string,
            title: string,
            userId: string,
          })
        ).isRequired,
        description: string,
        name: string,
        respondents: number,
        surveyId: string,
      })
    ),
  };

  state = {
    crossTabId: '',
    crosstabTitle: '',
    showDeleteCrossTabPopup: false,
  };

  handleDeleteCrosstab = (crosstabId) => {
    this.props.deleteCrosstab(crosstabId);
    this.toggleDeletePopup();
  };

  toggleDeletePopup = (data) => {
    if (data) {
      this.setState({
        crossTabId: data.crossTabId,
        crosstabTitle: data.title,
      });
    }
    this.setState({ showDeleteCrossTabPopup: !this.state.showDeleteCrossTabPopup });
  };

  crosstabList = () => {
    const {
      surveyList, id,
    } = this.props;
    const surveyData = surveyList.filter((survey) => survey.surveyId === id);

    return surveyData[0].crosstab.length > 0 ? (
      surveyData[0].crosstab.map((crosstab) => (
        <div className="header-activity">
          <div className="ez-label ez-top-margin">
            <div onClick={() => this.props.openCrosstabAction({ crosstab })}>
              <img src={'/assets/images/table-grid.svg'} />
              {crosstab.title}
            </div>
            <span className="crosstab_delete_btn">
              <img src={'/assets/images/delete.svg'} onClick={() => this.toggleDeletePopup(crosstab)} />{' '}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className="activity-progress">
        <div className="header-activity">
          <div className="ez-label ez-top-margin">
            <FormattedMessage id="noCrosstabForSurvey" />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { action } = this.props;

    const {
      crosstabTitle, crossTabId, showDeleteCrossTabPopup,
    } = this.state;

    return (
      <div className="ez_popup">
        <h2>
          Crosstab List
          <img src={'/assets/images/close-white.svg'} onClick={action} />
        </h2>
        <div className="ez_popup_body">{this.crosstabList()}</div>
        {!!showDeleteCrossTabPopup && (
          <DeletePopup
            action={this.toggleDeletePopup}
            handleDelete={this.handleDeleteCrosstab}
            id={crossTabId}
            item="crosstab"
            name={crosstabTitle}
            selectedId={crossTabId}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ newSurvey: { surveyList } }) => ({ surveyList });

export default injectIntl(
  connect(
    mapStateToProps,
    {
      deleteCrosstab,
      openCrosstabAction,
    }
  )(CrosstabListPopup)
);
