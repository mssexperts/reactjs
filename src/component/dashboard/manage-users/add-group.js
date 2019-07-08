import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { arrayOf, func, shape, string } from 'prop-types';
import { createGroup, fetchPermissions } from '../../../actions/manage-users-action-types';
import Dropdown from '../../common/dropdown';
import TextInput from '../../common/text-input';
import FormattedMessage from '../../common/formatted-message';
import User from '../../../utils/user';

class AddGroup extends Component {
  static propTypes = {
    createGroup: func.isRequired,
    createGroupStatus: string,
    fetchPermissions: func.isRequired,
    permissions: arrayOf(
      shape({
        name: string,
        value: string,
      })
    ),
  };

  state = {
    error: '',
    fields: {
      name: '',
      userPermissionId: 'c5a9769b-b79a-4228-97a1-f7e86be66fea',
    },
  };

  componentDidMount() {
    this.props.fetchPermissions();
  }

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
    });
  };

  handleKeyPress = (event) => {
    User.firstCharSpaceNotAllowed(event);
  };

  validateFields = () => {
    const { fields: { name } } = this.state;

    if (!name) {
      this.setState({ error: <FormattedMessage id="groupNameValidation" /> });

      return false;
    }

    this.setState({ error: '' });

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateFields();

    if (isValid) {
      this.props.createGroup(this.state.fields);
    }
  };

  render() {
    const { permissions } = this.props;

    const {
      error,
      fields: { name },
    } = this.state;

    return (
      <div className="ez-form-outer">
        <div className="ez-form-heading">
          <Link to="/manage-users">
            <img src={'/assets/images/left-arrow-back.svg'} />
            <FormattedMessage id="manageUsers" />
          </Link>
          <h3>
            <FormattedMessage id="addNewGroup" />
          </h3>
        </div>
        <form className="ez-left-form" onSubmit={this.handleSubmit}>
          <TextInput
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            labelName="groupName"
            name="name"
            placeHolder="enterGroupName"
            type="text"
            value={name}
          />
          {!!error && <label className="ez-label ez-error">{error}</label>}
          <Dropdown handleChange={this.handleChange} labelName="groupPermission" name="userPermissionId" options={permissions} />
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

const mapStateToProps = ({ manageUsers: { permissions } }) => ({ permissions });

export default connect(
  mapStateToProps,
  {
    createGroup,
    fetchPermissions,
  }
)(AddGroup);
