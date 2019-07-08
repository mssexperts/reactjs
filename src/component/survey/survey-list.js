import React, { Component } from 'react';
import { func, arrayOf, shape, string, number } from 'prop-types';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import FormattedMessage from '../common/formatted-message';
import PopUp from '../common/pop-up';
import UploadSurveyPopup from './upload-survey-popup';
import AddNewCrosstabPopup from './add-new-crosstab-popup';
import UpdateSurveyDataPopup from './update-survey-data-popup';
import DeletePopup from './delete-popup';
import { fetchSurveyList, newCrosstabDetails, deleteSurvey } from '../../actions/survey-action-types';
import Utils from '../../utils';
import options from '../../../config/options';
import CrosstabListPopup from './crosstab-list-popup';

const { dateFormatter } = Utils;

class SurveyList extends Component {
  static propTypes = {
    deleteSurvey: func.isRequired,
    fetchSurveyList: func.isRequired,
    newCrosstabDetails: func.isRequired,
    surveyList: arrayOf(
      shape({
        code: string,
        createdAt: string,
        description: string,
        name: string,
        respondents: number,
        surveyId: string,
      })
    ),
  };

  state = {
    fieldType: '',
    id: '',
    popupType: '',
    popupVisibility: false,
    selectedSurveyData: {},
  };

  componentDidMount() {
    this.props.fetchSurveyList();
  }

  onRowClick = (selectedSurveyData) => {
    this.setState({ selectedSurveyData });
  };

  renderShowTotal = (start, to, total) => (
    <div className="left-side-pagination">
      <FormattedMessage id="showing" /> {start} <FormattedMessage id="to" /> {to} <FormattedMessage id="outOf" /> {total} <FormattedMessage id="results" />
    </div>
  );

  fieldFormatter = (type, cell, title) => {
    if (type === 'description') {
      return <div>{cell || ''}</div>;
    }

    return (
      <div className="survey_img">
        {type === 'name' && <img src="assets/images/text-file.svg" />}
        {title}: <b>{cell}</b>
      </div>
    );
  };

  fieldActions = (cell) => (
    <ul className="btn_add">
      <li>
        <button title="createNewCrossTab" onClick={() => this.managePopup('CrosstabListPopup', cell)}>
          <img src={'/assets/images/crosstab-list.svg'} />
        </button>
        <span className="left-tooltip">
          <FormattedMessage id="openCrosstabList" />
        </span>
      </li>
      <li>
        <button title="createNewCrossTab" onClick={() => this.managePopup('AddNewCrosstabPopup', cell)}>
          <img src={'/assets/images/add-crosstab.svg'} />
        </button>
        <span className="left-tooltip">
          <FormattedMessage id="createNewCrossTab" />
        </span>
      </li>
      <li>
        <button title="updateSurveyDataPopup" onClick={() => this.managePopup('UpdateSurveyDataPopup', cell)}>
          <img src={'/assets/images/share-arrow.svg'} />
        </button>
        <span className="left-tooltip">
          <FormattedMessage id="updateSurveyDataPopup" />
        </span>
      </li>
      <li>
        <button onClick={() => this.managePopup('DeletePopup', cell)}>
          <img src={'/assets/images/delete.svg'} />
        </button>
        <span className="left-tooltip">
          <FormattedMessage id="deleteSurvey" />
        </span>
      </li>
    </ul>
  );

  managePopup = async (type, id = null) => {
    let field;

    if (type === 'AddNewCrosstabPopup') {
      const { surveyList } = this.props;

      const surveyOptions = await surveyList.filter((survey) => survey.surveyId === id);

      this.props.newCrosstabDetails({
        surveyId: surveyOptions.length > 0 ? id : '',
        surveyName: surveyOptions.length > 0 ? surveyOptions[0].name : '',
      });
      field = surveyOptions.length > 0 ? 'text' : 'dropdown';
    }
    this.setState({
      fieldType: field,
      id,
      popupType: type,
      popupVisibility: !this.state.popupVisibility,
    });
  };

  handleDelete = (surveyId) => {
    this.props.deleteSurvey(surveyId);

    this.managePopup();
  };

  getPopupChild = () => {
    const {
      fieldType, id, popupType,
    } = this.state;

    if (popupType === 'UploadSurveyPopup') {
      return <UploadSurveyPopup action={this.managePopup} />;
    }

    if (popupType === 'CrosstabListPopup') {
      return <CrosstabListPopup action={this.managePopup} id={id} />;
    }

    if (popupType === 'UpdateSurveyDataPopup') {
      return <UpdateSurveyDataPopup action={this.managePopup} id={id} />;
    }

    if (popupType === 'DeletePopup') {
      return (
        <DeletePopup
          action={this.managePopup}
          handleDelete={this.handleDelete}
          id={id}
          item="survey"
          name={this.state.selectedSurveyData.name}
          selectedId={this.state.selectedSurveyData.surveyId}
        />
      );
    }

    return <AddNewCrosstabPopup action={this.managePopup} fieldType={fieldType} />;
  };

  render() {
    const { popupVisibility } = this.state;
    const { surveyList } = this.props;

    const tableOptions = {
      ...options,
      defaultSortName: 'createdAt',
      onRowClick: this.onRowClick,
      paginationShowsTotal: this.renderShowTotal,
      sizePerPageList: [
        {
          text: '5',
          value: 5,
        },
        {
          text: '10',
          value: 10,
        },
        {
          text: 'All',
          value: surveyList.length,
        },
      ],
    };

    return (
      <div className="ez-form-settings">
        <div className="ez-page-body-wrapper">
          <div className="ez_padding_bx">
            <div className="ez-headings">
              <h3>
                <FormattedMessage id="manageSurvey" />
              </h3>
            </div>
            <div className="ez_form_element">
              <div className="ez_form_space last">
                <button className="ez-button" title="createNewCrossTab" type="button" onClick={() => this.managePopup('AddNewCrosstabPopup')}>
                  <FormattedMessage id="createNewCrossTab" />
                </button>
              </div>
            </div>
            <div className="ez_white custom">
              {surveyList.length ? (
                <BootstrapTable
                  pagination
                  data={surveyList || []}
                  multiColumnSearch={true}
                  options={tableOptions}
                  search={true}
                  tableHeaderClass={'col-hidden'}
                >
                  <TableHeaderColumn
                    columnClassName="survey"
                    dataField="name"
                    dataFormat={(cell) => this.fieldFormatter('name', cell, <FormattedMessage id="name" />)}
                  />
                  <TableHeaderColumn dataField="code" dataFormat={(cell) => this.fieldFormatter('code', cell, <FormattedMessage id="code" />)} />
                  <TableHeaderColumn
                    isKey
                    dataField="respondents"
                    dataFormat={(cell) => this.fieldFormatter('respondents', cell, <FormattedMessage id="respondents" />)}
                    searchable={false}
                  />
                  <TableHeaderColumn
                    columnClassName="survey"
                    dataField="createdAt"
                    dataFormat={(cell) => this.fieldFormatter('createdOn', dateFormatter(cell), <FormattedMessage id="createdOn" />)}
                    searchable={false}
                    width="150"
                  />
                  <TableHeaderColumn dataField="surveyId" dataFormat={this.fieldActions} export={false} searchable={false} />
                  <TableHeaderColumn
                    dataField="description"
                    dataFormat={(cell) => this.fieldFormatter('description', cell, '')}
                    searchable={false}
                    tdStyle={{ whiteSpace: 'normal' }}
                  />
                </BootstrapTable>
              ) : (
                <div className="user-pagination">
                  <FormattedMessage id="noDataToDisplay" />
                </div>
              )}
            </div>
          </div>
        </div>
        {popupVisibility && <PopUp action={this.managePopup}>{this.getPopupChild()}</PopUp>}
      </div>
    );
  }
}
const mapStateToProps = ({ newSurvey: { surveyList } }) => ({ surveyList });

export default connect(
  mapStateToProps,
  {
    deleteSurvey,
    fetchSurveyList,
    newCrosstabDetails,
  }
)(SurveyList);
