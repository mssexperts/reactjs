import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { bool, arrayOf, func, string, shape, number } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { fetchCrosstabAllReport, fetchSelectedFilterCrosstabReport } from '../../actions/crosstab-action-types';
import PopUp from '../common/pop-up';
import ReportDisplaySettings from './report-display-settings';
import MenuDropDown from '../common/menu-drop-down';

class RightSection extends Component {
  static propTypes = {
    crosstabDetails: shape({ sheetId: string }),
    dictionary: arrayOf(
      shape({
        code: string.isRequired,
        expression: string,
        id: number.isRequired,
        title: string.isRequired,
      })
    ),
    fetchCrosstabAllReport: func.isRequired,
    fetchSelectedFilterCrosstabReport: func.isRequired,
    pathname: string.isRequired,
    push: func.isRequired,
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
  };

  state = { isReportSettingsVisible: false };

  managePopup = () => {
    this.setState({ isReportSettingsVisible: !this.state.isReportSettingsVisible });
  };

  userMenuItems = [
    {
      onClickHandler: () => {
        window.open(`https://docs.google.com/spreadsheets/d/${this.props.crosstabDetails.sheetId}/export?format=pdf`, '_self');
      },
      text: <FormattedMessage id="pdf" />,
    },
    {
      onClickHandler: () => {
        window.open(`https://docs.google.com/spreadsheets/d/${this.props.crosstabDetails.sheetId}/export?format=xlsx`, '_self');
      },
      text: <FormattedMessage id="xls" />,
    },
    {
      onClickHandler: () => {
        window.open(`https://docs.google.com/spreadsheets/d/${this.props.crosstabDetails.sheetId}/export?format=csv`, '_self');
      },
      text: <FormattedMessage id="csv" />,
    },
  ];

  reportCalc = () => {
    this.props.fetchCrosstabAllReport({ calculate: true });
  };

  render() {
    const { crosstabDetails: { sheetId } } = this.props;

    const { isReportSettingsVisible } = this.state;

    return (
      <div className="right_table_width">
        <div className="right-display-setting">
          <div className="right_filter">
            <button className="ez-button" onClick={this.managePopup}>
              <FormattedMessage id="displaySettings" />
            </button>
            <button className="ez-button" onClick={this.reportCalc}>
              <FormattedMessage id="calculate" />
            </button>
            <MenuDropDown className="downlod_button" items={this.userMenuItems} srcUrl="/assets/images/download_arrow.png" />
          </div>
        </div>
        <div className="ez-google_sheet">
          <iframe
            frameBorder="0"
            src={`https://docs.google.com/spreadsheets/d/${sheetId}/edit?hl=en&hl=en&ui=2&chrome=false&headers=false&rm=demo&widget=false`}
          />
        </div>
        {isReportSettingsVisible && (
          <PopUp action={this.managePopup} popupId="reportDisplaySettings">
            <ReportDisplaySettings action={this.managePopup} />
          </PopUp>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  crosstab: { displayReportSettings },
  router: { location: { pathname } },
}) => ({
  displayReportSettings,
  pathname,
});

export default connect(
  mapStateToProps,
  {
    fetchCrosstabAllReport,
    fetchSelectedFilterCrosstabReport,
    push,
  }
)(RightSection);
