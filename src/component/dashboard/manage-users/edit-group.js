/* eslint no-param-reassign: 0 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { arrayOf, func, shape, string } from 'prop-types';
import { deleteGroup, editGroupFieldsState, editGroup, fetchGroups, fetchPermissions } from '../../../actions/manage-users-action-types';
import Dropdown from '../../common/dropdown';
import TextInput from '../../common/text-input';
import FormattedMessage from '../../common/formatted-message';
import SearchDropdown from '../../common/search-dropdown';
import DeleteGroup from './delete-group';
import User from '../../../utils/user';

class EditGroup extends Component {
  static propTypes = {
    deleteGroup: func.isRequired,
    editGroup: func.isRequired,
    editGroupFieldsState: func.isRequired,
    editGroupFieldsStateValue: shape({ userPermissionId: string }).isRequired,
    fetchGroups: func.isRequired,
    fetchPermissions: func.isRequired,
    groups: arrayOf(
      shape({
        name: string.isRequired,
        value: string.isRequired,
      })
    ),
    permissionDefaultValue: string.isRequired,
    permissions: arrayOf(
      shape({
        name: string.isRequired,
        value: string.isRequired,
      })
    ),
  };

  state = {
    errors: {},
    shouldShowModal: false,
  };

  componentDidMount() {
    this.props.fetchPermissions();
    this.props.fetchGroups();
  }

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    const {
      editGroupFieldsStateValue, permissionDefaultValue,
    } = this.props;

    const updatededitGroupFieldsState = {
      ...editGroupFieldsStateValue,
      [name]: value,
      userPermissionId: permissionDefaultValue,
    };

    this.props.editGroupFieldsState(updatededitGroupFieldsState);
  };

  handleSelectChange = (selectedOption) => {
    delete selectedOption.userGroupId;

    const { editGroupFieldsStateValue } = this.props;

    const updatedEditGroupFieldsState = {
      ...editGroupFieldsStateValue,
      selectedOption,
    };

    this.props.editGroupFieldsState(updatedEditGroupFieldsState);
  };

  handleKeyPress = (event) => {
    User.firstCharSpaceNotAllowed(event);
  };

  validateFields = () => {
    const { editGroupFieldsStateValue: { selectedOption } } = this.props;

    const errors = {};
    let isValid = true;

    if (!selectedOption) {
      isValid = false;
      errors.selectedOption = 'pleaseSelectGroup';
    }
    this.setState({ errors });

    return isValid;
  };

  handleSave = () => {
    const isValid = this.validateFields();

    if (isValid) {
      const { editGroupFieldsStateValue } = this.props;

      const updatedEditGroupFieldsState = {
        ...editGroupFieldsStateValue,
        userGroupId: editGroupFieldsStateValue.selectedOption.value,
      };

      delete updatedEditGroupFieldsState.selectedOption;

      this.props.editGroup({ ...updatedEditGroupFieldsState });
    }
  };

  showDeleteConfirmationBox = () => {
    const { editGroupFieldsStateValue: { selectedOption } } = this.props;

    if (selectedOption) {
      this.setState({ shouldShowModal: true });
      this.setState({ errors: {} });
    } else {
      this.setState({ errors: { selectedOption: 'pleaseSelectGroup' } });
    }
  };

  hideDeleteConfirmationBox = () => {
    this.setState({ shouldShowModal: false });
  };

  deleteGroup = () => {
    const { editGroupFieldsStateValue: { selectedOption } } = this.props;

    const { value } = selectedOption;

    this.props.deleteGroup(value);
    this.hideDeleteConfirmationBox();
  };

  showError = (error) => <label className="ez-label ez-error">{<FormattedMessage id={error} />}</label>;

  render() {
    const {
      editGroupFieldsStateValue: {
        name, selectedOption,
      },
      groups,
      permissions,
    } = this.props;

    const {
      errors: { selectedOption: errorSelectedOption },
      shouldShowModal,
    } = this.state;

    return (
      <div className="ez-form-outer">
        <div className="ez-form-heading">
          <Link to="/manage-users">
            <img src={'/assets/images/left-arrow-back.svg'} />
            <FormattedMessage id="manageUsers" />
          </Link>
          <h3>
            <FormattedMessage id="editGroup" />
          </h3>
        </div>
        <div className="ez-left-form">
          <SearchDropdown
            handleChange={this.handleSelectChange}
            labelName="selectaGroupNameToEdit"
            options={groups}
            placeHolder="selectGroup"
            value={selectedOption}
          />
          {!!errorSelectedOption && this.showError(errorSelectedOption)}
          <TextInput
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            labelName="newGroupName"
            name="name"
            placeHolder="enterNewGroupName"
            type="text"
            value={name}
          />
          <Dropdown handleChange={this.handleChange} labelName="groupPermission" name="userPermissionId" options={permissions} />
          {shouldShowModal && <DeleteGroup deleteGroup={this.deleteGroup} hideModal={this.hideDeleteConfirmationBox} />}
          <div className="text-field">
            <div className="ez-form-button add-role">
              <button className="ez-button-delete ez-button" onClick={this.showDeleteConfirmationBox}>
                <FormattedMessage id="deleteGroup" />
              </button>
              <button className="ez-button" onClick={this.handleSave}>
                <FormattedMessage id="save" />
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
    editGroupFieldsStateValue, groups, permissionDefaultValue, permissions,
  },
}) => ({
  editGroupFieldsStateValue,
  groups,
  permissionDefaultValue,
  permissions,
});

export default connect(
  mapStateToProps,
  {
    deleteGroup,
    editGroup,
    editGroupFieldsState,
    fetchGroups,
    fetchPermissions,
  }
)(EditGroup);
