import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { func, shape, string, number, node } from 'prop-types';
import LeftNav from './left-nav';
import Workspace from './workspace';
import { logOut, fetchLoginUserDetails } from '../../actions/user-authentication-action-types';

class Dashboard extends PureComponent {
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
          <LeftNav logOut={this.props.logOut} userRole={role} />
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
)(Dashboard);
