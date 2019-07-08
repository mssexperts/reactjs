import React, { Component } from 'react';
import { func, string, shape, boolean } from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserDetails } from '../../actions/manage-users-action-types';
import User from '../../utils/user';
import FormattedMessage from '../common/formatted-message';

const { userInfo } = new User();

class UserProfile extends Component {
  static propTypes = {
    fetchUserDetails: func.isRequired,
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

  componentDidMount() {
    const { userId } = userInfo();

    this.props.fetchUserDetails(userId);
  }

  render() {
    const {
      userDetails: {
        email, name,
      },
    } = this.props;

    return (
      <div className="ez-form-outer">
        <div className="ez-form-heading">
          <h3>
            <FormattedMessage id="myProfile" />
          </h3>
        </div>
        <div className="ez-left-form ez-profile-page">
          <div className="text-field">
            {/* This is temporary src for image.Will update once User Detail API is updated.  */}
            <p className="profile-img">
              <img src={'../assets/images/profile.svg'} />
            </p>
          </div>
          <div className="text-field">
            <label className="ez-label ez-top-margin">
              <FormattedMessage id="name" />
            </label>
            <h4>{name}</h4>
          </div>
          <div className="text-field">
            <label className="ez-label ez-top-margin">
              <FormattedMessage id="emailAddress" />
            </label>
            <h4>{email}</h4>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ manageUsers: { userDetails } }) => ({ userDetails });

export default connect(
  mapStateToProps,
  { fetchUserDetails }
)(UserProfile);
