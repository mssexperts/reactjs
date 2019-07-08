import React, { Component, Fragment } from 'react';
import { bool, func, string, shape, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { injectIntl, intlShape } from 'react-intl';
import { push } from 'connected-react-router';
import { fetchEnterprises } from '../../../actions/enterprise-action-types';
import FormattedMessage from '../../common/formatted-message';
import User from '../../../utils/user';

const { statusFormatter } = new User();

class ManageEnterprise extends Component {
  static propTypes = {
    enterprises: arrayOf(
      shape({
        expirationDate: string.isRequired,
        isActive: bool.isRequired,
        name: string.isRequired,
      })
    ),
    fetchEnterprises: func.isRequired,
    intl: intlShape.isRequired,
    push: func.isRequired,
  };

  componentDidMount() {
    this.props.fetchEnterprises();
  }

  onRowClick = ({ companyId }) => {
    this.props.push(`/manage-users/edit-enterprise/${companyId}`);
  };

  renderShowTotal = (start, to, total) => (
    <div className="left-side-pagination">
      <FormattedMessage id="showing" /> {start} <FormattedMessage id="to" /> {to} <FormattedMessage id="outOf" /> {total} <FormattedMessage id="results" />
    </div>
  );

  render() {
    const {
      enterprises, intl,
    } = this.props;

    const options = {
      defaultSortName: 'name',
      defaultSortOrder: 'asc',
      firstPage: 'First',
      lastPage: 'Last',
      nextPage: 'Next',
      onRowClick: this.onRowClick,
      pageStartIndex: 1,
      paginationPosition: 'bottom',
      paginationShowsTotal: this.renderShowTotal,
      paginationSize: 3,
      prePage: 'Prev',
      sizePerPage: 10,
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
          value: enterprises.length,
        },
      ],
      withFirstAndLast: true,
    };

    return (
      <Fragment>
        <div className="ez-headings">
          <h3>
            <FormattedMessage id="manageEnterprise" />
          </h3>
        </div>
        <div className="ez-top-button">
          <ul>
            <li>
              <Link className="ez-width-auto ez-button-small" to="/manage-users/add-enterprise">
                <FormattedMessage id="addNewEnterprise" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="ez-user-table">
          <div className="ez-table-pagination">
            {enterprises.length ? (
              <BootstrapTable pagination data={enterprises || []} options={options}>
                <TableHeaderColumn
                  dataSort
                  dataField="name"
                  filter={{
                    placeholder: intl.formatMessage({ id: 'name' }),
                    type: 'TextFilter',
                  }}
                >
                  <span className="ez-capitalize">
                    <FormattedMessage id="name" />
                  </span>
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort
                  dataField="adminEmail"
                  filter={{
                    placeholder: intl.formatMessage({ id: 'email' }),
                    type: 'TextFilter',
                  }}
                >
                  <span className="ez-capitalize">
                    <FormattedMessage id="email" />
                  </span>
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort
                  isKey
                  dataField="isActive"
                  dataFormat={statusFormatter}
                  filter={{
                    placeholder: intl.formatMessage({ id: 'status' }),
                    type: 'TextFilter',
                  }}
                >
                  <span className="ez-capitalize">
                    <FormattedMessage id="status" />
                  </span>
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort
                  dataField="expirationDate"
                  filter={{
                    placeholder: intl.formatMessage({ id: 'expirationDate' }),
                    type: 'DateFilter',
                  }}
                >
                  {
                    <span className="ez-capitalize">
                      <FormattedMessage id="expirationDate" />
                    </span>
                  }
                </TableHeaderColumn>
              </BootstrapTable>
            ) : (
              <div className="user-pagination">
                <FormattedMessage id="noDataToDisplay" />
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapUserListProps = ({ enterprise: { enterprises } }) => ({ enterprises });

export default injectIntl(
  connect(
    mapUserListProps,
    {
      fetchEnterprises,
      push,
    }
  )(ManageEnterprise)
);
