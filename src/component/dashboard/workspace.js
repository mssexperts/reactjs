import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { string, shape, node } from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import FormattedMessage from '../common/formatted-message';

class Workspace extends PureComponent {
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
      if (notificationType === 'error') {
        toast.error(<FormattedMessage id={notificationMessage} />);
      } else if (notificationType === 'success') {
        toast.success(<FormattedMessage id={notificationMessage} />);
      } else {
        toast.error(notificationMessage);
      }
    }
  };

  render() {
    const { children } = this.props;

    return (
      <div className="ez-form-settings">
        <div className="ez-page-body-wrapper">
          <ToastContainer autoClose={10000} closeOnClick={true} hideProgressBar={true} />
          <div className="ez-bg-outer">{children}</div>
        </div>
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
)(Workspace);
