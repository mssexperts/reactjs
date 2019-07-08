import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { arrayOf, func, shape, string } from 'prop-types';
import { createUserFieldsState, createUser, fetchGroups, fetchPermissions } from '../../../actions/manage-users-action-types';
// import Dropdown from '../../common/dropdown';
import TextInput from '../../common/text-input';
import FormattedMessage from '../../common/formatted-message';
import User from '../../../utils/user';

const { validateEmail } = new User();

class AddUser extends Component {
  static propTypes = {
    createUser: func.isRequired,
    createUserFieldsState: func.isRequired,
    createUserFieldsStateValue: shape({
      email: string,
      name: string,
      userGroupId: string,
    }).isRequired,
    fetchGroups: func.isRequired,
    fetchPermissions: func.isRequired,
    groups: arrayOf(
      shape({
        name: string.isRequired,
        value: string.isRequired,
      })
    ),
    permissions: arrayOf(
      shape({
        name: string.isRequired,
        value: string.isRequired,
      })
    ),
  };

  state = { errors: {} };

  componentDidMount() {
    this.props.fetchGroups();
    this.props.fetchPermissions();
  }

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    const { createUserFieldsStateValue } = this.props;

    const updatedCreateUserFieldsStateValue = {
      ...createUserFieldsStateValue,
      [name]: value,
    };

    this.props.createUserFieldsState(updatedCreateUserFieldsStateValue);
  };

  handleKeyPress = (event) => {
    const { name } = event.target;

    if (name === 'name') {
      User.firstCharSpaceNotAllowed(event);
      User.restrictSpecialChar(event);
    } else if (name === 'email') {
      User.spaceNotAllowed(event);
    }
  };

  validateFields = () => {
    const {
      createUserFieldsStateValue: {
        email,
        name,
        // userGroupId,
      },
    } = this.props;

    const errors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      errors.email = <FormattedMessage id="emptyEmailValidation" />;
    } else if (!validateEmail(email)) {
      isValid = false;
      errors.email = <FormattedMessage id="emailValidation" />;
    }

    if (!name) {
      isValid = false;
      errors.name = <FormattedMessage id="userNameValidation" />;
    }

    // if (!userGroupId || !User.validateGuid(userGroupId)) {
    //   isValid = false;
    //   errors.group = <FormattedMessage id="selectGroup" />;
    // }

    this.setState({ errors });

    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateFields();

    if (isValid) {
      const { createUserFieldsStateValue } = this.props;

      delete createUserFieldsStateValue.userPermissionId;
      delete createUserFieldsStateValue.userGroupId;

      this.props.createUser(createUserFieldsStateValue);
    }
  };

  showError = (error) => error && <label className="ez-label ez-error">{error}</label>;

  render() {
    const {
      createUserFieldsStateValue: {
        name, email,
      },
      // groups,
      // permissions,
    } = this.props;
    const {
      errors: {
        name: errorName,
        email: errorEmail,
        // group: errorGroup,
      },
    } = this.state;

    return (
      <div className="ez-form-outer">
        <div className="ez-form-heading">
          <Link to="/manage-users">
            <img src={'/assets/images/left-arrow-back.svg'} />
            <FormattedMessage id="manageUsers" />
          </Link>
          <h3>
            <FormattedMessage id="addUser" />
          </h3>
        </div>
        <form className="ez-left-form" onSubmit={this.handleSubmit}>
          <TextInput
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            labelName="name"
            name="name"
            placeHolder="enterName"
            type="text"
            value={name}
          />
          {this.showError(errorName)}
          <TextInput
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            labelName="email"
            name="email"
            placeHolder="emailId"
            stringMaxLength={255}
            stringMinLength={6}
            type="text"
            value={email}
          />
          {this.showError(errorEmail)}
          {/* <Dropdown handleChange={this.handleChange} labelName="group" name="userGroupId" options={groups} placeholder="pleaseSelectGroup" />
          {this.showError(errorGroup)}
          <Dropdown handleChange={this.handleChange} labelName="userPermission" name="userPermissionId" options={permissions} /> */}
          <div className="text-field">
            <div className="ez-form-button add-role">
              <button className="ez-button">
                <FormattedMessage id="add" />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({
  manageUsers: {
    createUserFieldsStateValue, groups, permissions,
  },
}) => ({
  createUserFieldsStateValue,
  groups,
  permissions,
});

export default connect(
  mapStateToProps,
  {
    createUser,
    createUserFieldsState,
    fetchGroups,
    fetchPermissions,
  }
)(AddUser);
