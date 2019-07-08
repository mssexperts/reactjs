import React, { PureComponent } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { push } from 'connected-react-router';
import { bool, func, arrayOf, shape, string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { usersDashboard, filterUsers, fetchUsers } from '../../../actions/manage-users-action-types';
import FormattedMessage from '../../common/formatted-message';
import User from '../../../utils/user';
import Dropdown from '../../common/dropdown';
import { statusOptions } from '../../../../config/dropdown';
import TextInput from '../../common/text-input';
import options from '../../../../config/options';
import Translate from '../../../utils/translate';

const {
  dateTimeFormatter, statusFormatter, statusColorFormatter,
} = new User();

class ManageUsers extends PureComponent {
  static propTypes = {
    fetchUsers: func.isRequired,
    filterUsers: func.isRequired,
    groups: arrayOf(
      shape({
        name: string,
        value: string,
      })
    ),
    permissions: arrayOf(
      shape({
        name: string,
        value: string,
      })
    ),
    push: func.isRequired,
    users: arrayOf(
      shape({
        active: bool.isRequired,
        email: string.isRequired,
        name: string,
        userGroupId: string.isRequired,
        userPermissionId: string.isRequired,
      })
    ).isRequired,
    usersDashboard: func.isRequired,
    usersStat: shape({
      activeUsers: number,
      inActiveUsers: number,
    }),
  };

  state = {
    fields: {
      email: '',
      enableResetButton: true,
      filter: '',
      filterDropdown: 'userName',
      search: '',
      status: '',
      userGroupId: '',
      userName: '',
      userPermissionId: '',
    },
    filters: [
      {
        id: 1,
        name: Translate.translate('name'),
        value: 'username',
      },
      {
        id: 2,
        name: Translate.translate('email'),
        value: 'email',
      },
      {
        id: 3,
        name: Translate.translate('status'),
        value: 'status',
      },
    ],
  };

  componentDidMount() {
    this.props.usersDashboard();
  }

  renderShowTotal = (start, to, total) => (
    <div className="left-side-pagination">
      <FormattedMessage id="showing" /> {start} <FormattedMessage id="to" /> {to} <FormattedMessage id="outOf" /> {total} <FormattedMessage id="results" />
    </div>
  );

  onRowClick = ({ userId }) => {
    this.props.push(`/manage-users/edituser/${userId}`);
  };

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    const { fields } = this.state;

    this.setState({
      fields: {
        ...fields,
        [name]: value,
      },
      isHidden: true,
    });
  };

  filterRequest = () => {
    const {
      fields: {
        search, filterDropdown, status,
      },
    } = this.state;

    let dropdownKey = filterDropdown;
    let dropdownValue = search;

    if (filterDropdown === 'name') {
      dropdownKey = 'username';
    }

    if (dropdownKey === 'status') {
      dropdownValue = status;
    }

    const { fields } = this.state;

    this.setState({
      fields: {
        ...fields,
        enableResetButton: false,
      },
    });
    this.props.filterUsers({ [dropdownKey]: dropdownValue });
  };

  filterResetRequest = () => {
    this.props.filterUsers();
    this.setState({
      fields: {
        email: '',
        filterDropdown: this.state.filters[0].value,
        search: '',
        status: '',
        userName: '',
      },
    });
  };

  toggleHidden = () => {
    this.setState({ isHidden: !this.state.isHidden });
  };

  render() {
    const {
      filters,
      fields: {
        enableResetButton, status, filterDropdown, search,
      },
    } = this.state;
    const {
      users, usersStat,
    } = this.props;

    const { isHidden } = this.state;

    const tableOptions = {
      ...options,
      defaultSortOrder: 'asc',
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
          value: users.length,
        },
      ],
    };

    return (
      <div>
        <div className="ez-headings">
          <h3>
            <FormattedMessage id="manageUsers" />
          </h3>
        </div>
        <div className="ez-top-button">
          <div className="ez-user-detail">
            <ul>
              <h3>
                <FormattedMessage id="users" />
              </h3>
              <li>
                <h3>
                  <FormattedMessage id="activeUsers" />
                  <span>{usersStat.activeUsers}</span>
                </h3>
              </li>
              <li>
                <h3>
                  <FormattedMessage id="inactiveUsers" />
                  <span>{usersStat.inActiveUsers}</span>
                </h3>
              </li>
            </ul>
          </div>
          <ul>
            {/* Note: Edit Group and Permissions functionality is not handled at backend */}
            {/* <li>
              <Link className="ez-width-auto ez-button-small" to="/manage-users/editgroup">
                <FormattedMessage id="editAGroup" />
              </Link>
            </li>
            <li>
              <Link className="ez-width-auto ez-button-small" to="/manage-users/addgroup">
                <FormattedMessage id="addNewGroup" />
              </Link>
            </li> */}
            <li>
              <Link className="ez-width-auto ez-button-small" to="/manage-users/adduser">
                <FormattedMessage id="addNewUser" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="ez-search-user">
          <h4>
            <FormattedMessage id="searchUsers" />
          </h4>
          <div className="ez-toggle">
            <button className={isHidden ? 'btn minus' : 'btn plus'} type="button" onClick={this.toggleHidden} />
          </div>
        </div>
        <div className="user_search">
          <h3>
            <FormattedMessage id="filter" />
          </h3>
          <div className="serach_box">
            <Dropdown className="drop-down" handleChange={this.handleChange} name="filterDropdown" options={filters} value={filterDropdown} />
            {filterDropdown === 'status' ? (
              <Dropdown className="text-field-wrapper" handleChange={this.handleChange} name="status" options={statusOptions} value={status} />
            ) : (
              <TextInput
                className="text-filter"
                handleChange={this.handleChange}
                headerClassName="text-field-wrapper"
                labelName=""
                name="search"
                placeHolder="search"
                placeHolder="search"
                type="text"
                value={search}
              />
            )}
          </div>
          <button className="ez-button-small ez-width-auto" onClick={this.filterRequest}>
            <FormattedMessage id="search" />
          </button>
          <button className="ez-button-small ez-width-auto reset-filter-btn" disabled={enableResetButton} onClick={this.filterResetRequest}>
            <FormattedMessage id="resetFilters" />
          </button>
        </div>
        <div className="ez-user-table">
          <div className="ez-table-pagination">
            {users.length ? (
              <BootstrapTable pagination data={users || []} options={tableOptions}>
                <TableHeaderColumn dataSort dataField="name">
                  <FormattedMessage id="name" />
                </TableHeaderColumn>
                <TableHeaderColumn dataSort isKey dataField="email">
                  <FormattedMessage id="email" />
                </TableHeaderColumn>
                {/* <TableHeaderColumn dataSort dataField="permissionName">
                  <FormattedMessage id="permissionName" />
                </TableHeaderColumn> */}
                <TableHeaderColumn dataSort dataField="groupName">
                  <FormattedMessage id="groupName" />
                </TableHeaderColumn>
                <TableHeaderColumn dataSort columnClassName={statusColorFormatter} dataField="active" dataFormat={statusFormatter}>
                  <FormattedMessage id="status" />
                </TableHeaderColumn>
                <TableHeaderColumn dataSort dataField="lastLog" dataFormat={dateTimeFormatter}>
                  <FormattedMessage id="lastLogin" />
                </TableHeaderColumn>
              </BootstrapTable>
            ) : (
              <div className="user-pagination">
                <FormattedMessage id="noDataToDisplay" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapUserListProps = ({
  manageUsers: {
    groups, permissions, users, usersStat,
  },
}) => ({
  groups,
  permissions,
  users,
  usersStat,
});

export default connect(
  mapUserListProps,
  {
    fetchUsers,
    filterUsers,
    push,
    usersDashboard,
  }
)(ManageUsers);
