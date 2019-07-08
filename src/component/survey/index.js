import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape, string, number, node } from 'prop-types';
import { push } from 'connected-react-router';
import LeftNav from '../dashboard/left-nav';
import Workspace from './workspace';
import { fetchLoginUserDetails, logOut } from '../../actions/user-authentication-action-types';

class Survey extends Component {
  static propTypes = {
    children: node.isRequired,
    fetchLoginUserDetails: func.isRequired,
    logOut: func.isRequired,
    loginUserDetails: shape({ role: number }),
    push: func.isRequired,
    userProfileDetail: shape({
      accessToken: string,
      companyId: string,
      email: string,
      role: number,
      userId: string,
      userName: string,
    }),
  };

  componentDidMount() {
    this.props.fetchLoginUserDetails();
  }

  render() {
    const {
      children,
      loginUserDetails: { role },
    } = this.props;

    return (
      <div className="ez-wrapper">
        <div className="ez-page-full">
          <LeftNav userRole={role} />
          <Workspace>{children}</Workspace>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ login: { loginUserDetails } }) => ({ loginUserDetails });

export default connect(
  mapStateToProps,
  {
    fetchLoginUserDetails,
    logOut,
    push,
  }
)(Survey);
