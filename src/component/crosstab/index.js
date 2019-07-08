import React, { Component } from 'react';
import { func, shape, number } from 'prop-types';
import { connect } from 'react-redux';
import LeftNav from '../dashboard/left-nav';
import { logOut, fetchLoginUserDetails } from '../../actions/user-authentication-action-types';
import Workspace from './workspace';

class Crosstab extends Component {
  static propTypes = {
    fetchLoginUserDetails: func.isRequired,
    logOut: func.isRequired,
    loginUserDetails: shape({ role: number }),
  };

  componentDidMount() {
    this.props.fetchLoginUserDetails();
  }

  render() {
    const { loginUserDetails: { role } } = this.props;

    return (
      <div className="ez-wrapper">
        <div className="ez-page-full">
          <LeftNav logOut={this.props.logOut} userRole={role} />
          <div className="ez-form-settings">
            <Workspace />
          </div>
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
  }
)(Crosstab);
