/* eslint-disable no-redeclare */
import React, { PureComponent, Fragment } from 'react';
import { arrayOf, bool, func, shape, string, number, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import FormattedMessage from '../common/formatted-message';
import { reportDisplaySettingsHandelChange, updateReportDisplaySettings } from '../../actions/crosstab-action-types';
import Crosstab from '../../utils/crosstab';

const { nodeTree } = new Crosstab();

class ReportDisplaySettings extends PureComponent {
  static propTypes = {
    action: func,
    dictionary: arrayOf(
      shape({
        code: string.isRequired,
        expression: string,
        id: string.isRequired,
        title: string.isRequired,
      })
    ),
    reportDisplaySettings: shape({
      dataItems: shape({
        aud: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        columnPercentage: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        index: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        rowPercentage: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        totalColumn: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        totalRow: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        weight: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
      }),
      weightFile: string,
    }),
    reportDisplaySettingsError: instanceOf(Object),
    reportDisplaySettingsHandelChange: func.isRequired,
    saveReportDisplaySettings: func.isRequired,
    updateReportDisplaySettings: func.isRequired,
    updateReportSettingsStatus:
      shape({
        message: string,
        status: bool,
      }) || string,
  };

  state = {
    activeTab: 'dataItem',
    updateReportSettingsStatus: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.updateReportSettingsStatus !== this.props.updateReportSettingsStatus) {
      this.setState({ updateReportSettingsStatus: this.props.updateReportSettingsStatus });
    }
  }

  switchTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    this.props.reportDisplaySettingsHandelChange({ [name]: value });
  };

  checkBoxHandleChange = (event) => {
    const { name } = event.target;

    const keys = name.split('.');

    const { includeInReport } = this.props.reportDisplaySettings.dataItems[keys[1]];

    this.props.reportDisplaySettingsHandelChange({ [name]: !includeInReport });
  };

  popupTabs = () => {
    const { activeTab } = this.state;
    const tabs = ['dataItem', 'weightFile'];

    const tabsHtml = tabs.map((tab, key) => (
      <li className={activeTab === tab ? 'active' : ''} key={key}>
        <a onClick={() => this.switchTab(tab)}>
          <FormattedMessage id={tab} />
        </a>
      </li>
    ));

    return tabsHtml;
  };

  dataItemsDropdownOptions = (count) => {
    const options = [];

    for (let i = 1; i <= count; i += 1) {
      options.push(<option value={i}>{i}</option>);
    }

    return options;
  };

  dataItemTabFields = () => {
    const { dataItems } = this.props.reportDisplaySettings;

    const fields = Object.keys(dataItems).map((tabField, key) => (
      <li key={key}>
        <input className="ez-input" name={`dataItems.${tabField}.title`} type="text" value={dataItems[tabField].title} onChange={this.handleChange} />
        {tabField !== 'totalColumn' && tabField !== 'totalRow' && (
          <Fragment>
            <select className="ez-select" name={`dataItems.${tabField}.displayOrder`} value={dataItems[tabField].displayOrder} onChange={this.handleChange}>
              {this.dataItemsDropdownOptions(5)}
            </select>
            <input
              className="check_ez"
              defaultChecked={dataItems[tabField].includeInReport}
              name={`dataItems.${tabField}.includeInReport`}
              type="checkbox"
              onChange={this.checkBoxHandleChange}
            />
          </Fragment>
        )}
      </li>
    ));

    return fields;
  };

  weightFileTabFields = () => {
    const { dictionary } = this.props;
    const dictionariesOptions = nodeTree(dictionary);

    const attrOptions = dictionariesOptions.map((attr, key) => (
      <option key={key + 1} value={attr.code}>
        {attr.title}
      </option>
    ));

    return attrOptions;
  };

  updateReportSettings = () => {
    const { reportDisplaySettings } = this.props;

    this.props.updateReportDisplaySettings(JSON.stringify(reportDisplaySettings));
  };

  render() {
    const {
      action,
      reportDisplaySettings: { weightFile },
      reportDisplaySettingsError,
    } = this.props;

    const {
      activeTab, updateReportSettingsStatus,
    } = this.state;

    const errorCheck = Object.keys(reportDisplaySettingsError).length === 0;

    return (
      <div>
        <div className="ez_popup">
          <h2>
            <FormattedMessage id="reportOptions" />
          </h2>
          {errorCheck ? (
            <div className="ez_popup_body">
              <ul className="nav nav-tabs">{this.popupTabs()}</ul>
              <div className="tab-content">
                {activeTab === 'dataItem' && (
                  <div className="tab-pane fade in active" id="dataItem">
                    <ul className="ez-total-data">
                      <span className="include-heading">
                        <FormattedMessage id="includeThisInReport" />
                      </span>
                      {this.dataItemTabFields()}
                    </ul>
                  </div>
                )}
                {activeTab === 'weightFile' && (
                  <div className="tab-pane fade in active" id="weightFile">
                    <div className="ez-right" />
                    <ul className="ez-total-data">
                      <li>
                        <span>
                          <FormattedMessage id="selectWeightColumnName" />
                          <br />
                          <FormattedMessage id="noteSettingWeight" />
                        </span>
                        <select className="ez-select" name="weightFile" value={weightFile} onChange={this.handleChange}>
                          <option key={0} value="">
                            None
                          </option>
                          {this.weightFileTabFields()}
                        </select>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              <FormattedMessage id="errorInLoadingReportSettings" />
            </div>
          )}
          {updateReportSettingsStatus !== null
            && (updateReportSettingsStatus.status ? (
              <div className="alert alert-success" role="alert">
                {updateReportSettingsStatus.message}
              </div>
            ) : (
              <div className="alert alert-danger" role="alert">
                {updateReportSettingsStatus.message}
              </div>
            ))}
          <div className="modal-footer footer_popup3">
            {errorCheck && (
              <button className="btn btn-default" data-dismiss="modal" type="button" onClick={this.updateReportSettings}>
                <FormattedMessage id="update" />
              </button>
            )}
            <button className="btn btn-default" data-dismiss="modal" type="button" onClick={action}>
              <FormattedMessage id="close" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  crosstab: {
    dictionary, reportDisplaySettings, reportDisplaySettingsError, updateReportSettingsStatus,
  },
}) => ({
  dictionary,
  reportDisplaySettings,
  reportDisplaySettingsError,
  updateReportSettingsStatus,
});

export default connect(
  mapStateToProps,
  {
    reportDisplaySettingsHandelChange,
    updateReportDisplaySettings,
  }
)(ReportDisplaySettings);
