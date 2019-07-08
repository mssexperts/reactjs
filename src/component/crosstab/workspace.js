import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bool, func, arrayOf, string, shape, number } from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchCrosstabAttributes, fetchDictionary, fetchReportDisplaySettings } from '../../actions/crosstab-action-types';
import LeftSection from './left-section';
import RightSection from './right-section';
import Crosstab from '../../utils/crosstab';
import FormattedMessage from '../common/formatted-message';

const { crosstabInfo } = Crosstab;

class Workspace extends Component {
  static propTypes = {
    crosstabDetails: shape({ sheetId: string.isRequired }).isRequired,
    crosstabReport: arrayOf(
      shape({
        id: string.isRequired,
        rowname: string.isRequired,
        totalsum: string.isRequired,
      })
    ),
    dictionary: arrayOf(
      shape({
        code: string.isRequired,
        expression: string,
        id: number.isRequired,
        title: string.isRequired,
      })
    ),
    fetchCrosstabAttributes: func.isRequired,
    fetchDictionary: func.isRequired,
    fetchReportDisplaySettings: func.isRequired,
    isLoading: bool.isRequired,
    onChange: func,
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

  static defaultProps = { isLoading: true };

  state = { pivotTableSectionIsHidden: true };

  componentDidMount() {
    this.props.fetchDictionary();
    this.props.fetchCrosstabAttributes();
    this.props.fetchReportDisplaySettings();
  }

  togglePivotTableSection = () => {
    this.setState({ pivotTableSectionIsHidden: !this.state.pivotTableSectionIsHidden });
  };

  render() {
    const {
      title, surveyName,
    } = crosstabInfo();

    const {
      crosstabDetails, crosstabReport, dictionary, isLoading, reportDisplaySettings,
    } = this.props;

    const { pivotTableSectionIsHidden } = this.state;

    return (
      <Fragment>
        <div className="top_bottom_bar">
          <Link to="/">
            <img src={'/assets/images/left-arrow-back.svg'} /> <FormattedMessage id="back" />
          </Link>
          <h3>
            {surveyName} {'/'}
            <span>{title}</span>
          </h3>
        </div>
        <div className="ez-page-body-wrapper crosstab-workspace">
          <div className={`table_wrapper_right ${!pivotTableSectionIsHidden && 'expand'}`}>
            <LeftSection
              crosstabDetails={crosstabDetails}
              dictionary={dictionary}
              pivotTableSectionIsHidden={pivotTableSectionIsHidden}
              reportDisplaySettings={reportDisplaySettings}
            />
            <RightSection
              crosstabDetails={crosstabDetails}
              crosstabReport={crosstabReport}
              dictionary={dictionary}
              isLoading={isLoading}
              reportDisplaySettings={reportDisplaySettings}
            />
          </div>
          <button className="full-screen-button" onClick={this.togglePivotTableSection}>
            <img src={'/assets/images/full-screen.svg'} />
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  crosstab: {
    crosstabDetails, crosstabReport, dictionary, isLoading, reportDisplaySettings,
  },
}) => ({
  crosstabDetails,
  crosstabReport,
  dictionary,
  isLoading,
  reportDisplaySettings,
});

export default connect(
  mapStateToProps,
  {
    fetchCrosstabAttributes,
    fetchDictionary,
    fetchReportDisplaySettings,
  }
)(Workspace);
