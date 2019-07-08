import React, { Component } from 'react';
import { connect } from 'react-redux';
import { node, shape, string } from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import FormattedMessage from '../common/formatted-message';

class UserAuthentication extends Component {
  static propTypes = {
    children: node.isRequired,
    message: shape({
      notificationMessage: string,
      notificationType: string,
    }),
    notificationStatus: string,
  };

  componentDidUpdate = (prevProps) => {
    const { notificationStatus: prevNotificationStatus } = prevProps;
    const {
      message, notificationStatus,
    } = this.props;

    const {
      notificationMessage, notificationType,
    } = message;

    if (prevNotificationStatus !== notificationStatus && notificationStatus === 'show') {
      switch (notificationType) {
        case 'error':
          toast.error(<FormattedMessage id={notificationMessage} />);
          break;

        case 'success':
          toast.success(<FormattedMessage id={notificationMessage} />);
          break;

        case 'serverError':
          toast.error(notificationMessage);
          break;

        default:
          break;
      }
    }
  };

  render() {
    const { children } = this.props;

    return (
      <div className="ez-login">
        <div className="ez-login-leftside">
          <div className="ez-leftside-inner">
            <div className="logo ez-text-center">
              <img src={'/assets/images/logo.png'} />
            </div>
            {children}
          </div>
        </div>
        <div className="ez-rightside">
          <img src={'/assets/images/login-right.jpg'} />
        </div>
        <ToastContainer autoClose={10000} closeOnClick={true} hideProgressBar={true} />
      </div>
    );
  }
}
const mapStateToProps = ({
  notification: {
    message, notificationStatus, notificationType,
  },
}) => ({
  message,
  notificationStatus,
  notificationType,
});

export default connect(
  mapStateToProps,
  null
)(UserAuthentication);
