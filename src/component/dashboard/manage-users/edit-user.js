import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { arrayOf, func, string, shape, boolean } from 'prop-types';
import { fetchGroups, fetchPermissions, fetchUserDetails, updateUserDetails, updateUserDetailProp } from '../../../actions/manage-users-action-types';
import Dropdown from '../../common/dropdown';
import TextInput from '../../common/text-input';
import FormattedMessage from '../../common/formatted-message';
import { statusOptions } from '../../../../config/dropdown';
import User from '../../../utils/user';

class EditUser extends PureComponent {
  static propTypes = {
    fetchGroups: func.isRequired,
    fetchPermissions: func.isRequired,
    fetchUserDetails: func.isRequired,
    groups: arrayOf(
      shape({
        name: string,
        value: string,
      })
    ),
    location: shape({ search: string.isRequired }),
    match: shape({ params: shape({ id: string.isRequired }) }),
    permissions: arrayOf(
      shape({
        name: string,
        value: string,
      })
    ),
    updateUserDetailProp: func.isRequired,
    updateUserDetails: func.isRequired,
    userDetails: shape({
      active: boolean,
      companyId: string,
      email: string,
      name: string,
      userGroupId: string,
      userId: string,
      userPermissionId: string,
    }),
  };

  state = { error: '' };

  componentDidMount() {
    this.props.fetchPermissions();
    this.props.fetchGroups();
    this.props.fetchUserDetails(this.getParams());
  }

  getParams = () => {
    const { match: { params } } = this.props;

    return params.id;
  };

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    this.props.updateUserDetailProp({ [name]: value });
  };

  validateFields = () => {
    const { name } = this.props.userDetails;

    if (!name) {
      this.setState({ error: <FormattedMessage id="userNameValidation" /> });

      return false;
    }

    this.setState({ error: '' });

    return true;
  };

  handleKeyPress = (event) => {
    const { name } = event.target;

    if (name === 'name') {
      User.firstCharSpaceNotAllowed(event);
      User.restrictSpecialChar(event);
    }
  };

  updateDetails = () => {
    const isValid = this.validateFields();

    if (isValid) {
      const { userDetails } = this.props;

      delete userDetails.userPermissionId;
      delete userDetails.userGroupId;

      this.props.updateUserDetails(userDetails);
    }
  };

  render() {
    const {
      // groups, permissions,
      userDetails,
    } = this.props;

    const {
      active,
      email,
      name,
      //  userGroupId, userPermissionId,
    } = userDetails;

    const { error } = this.state;

    const updatedStatusOptions = statusOptions.filter((statusOption) => statusOption.value !== null);

    return (
      <div className="ez-form-outer">
        <div className="ez-form-heading">
          <Link to="/manage-users">
            <img src="/assets/images/left-arrow-back.svg" />
            <FormattedMessage id="manageUser" />
          </Link>
          <h3>
            <FormattedMessage id="editUser" />
          </h3>
        </div>
        <div className="ez-left-form">
          <TextInput
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            labelName="userName"
            name="name"
            placeHolder="enterUserName"
            type="text"
            value={name}
          />
          {!!error && <label className="ez-label ez-error">{error}</label>}
          <TextInput
            handleChange={this.handleChange}
            labelName="email"
            name="email"
            placeHolder="enterEmailAddress"
            readonly="readonly"
            stringMaxLength={255}
            stringMinLength={6}
            type="text"
            value={email}
          />
          {/* <Dropdown handleChange={this.handleChange} labelName="userGroup" name="userGroupId" options={groups} value={userGroupId} />
          <Dropdown handleChange={this.handleChange} labelName="userPermission" name="userPermissionId" options={permissions} value={userPermissionId} /> */}
          <Dropdown handleChange={this.handleChange} labelName="status" name="active" options={updatedStatusOptions} value={active} />
          <div className="text-field">
            <div className="ez-form-button add-role">
              <button className="ez-button" onClick={this.updateDetails}>
                <FormattedMessage id="update" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  manageUsers: {
    groups, permissions, userDetails,
  },
}) => ({
  groups,
  permissions,
  userDetails,
});

export default connect(
  mapStateToProps,
  {
    fetchGroups,
    fetchPermissions,
    fetchUserDetails,
    updateUserDetailProp,
    updateUserDetails,
  }
)(EditUser);
