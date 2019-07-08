import React, { Component } from 'react';
import { func, string } from 'prop-types';
import FormattedMessage from '../common/formatted-message';

class DeletePopup extends Component {
  static propTypes = {
    action: func.isRequired,
    handleDelete: func.isRequired,
    id: string,
    item: string.isRequired,
    name: string.isRequired,
    selectedId: string.isRequired,
  };

  render() {
    const {
      action, name, selectedId, handleDelete, item,
    } = this.props;

    return (
      <div className="ez_popup">
        <h2>
          <FormattedMessage id="delete" /> <FormattedMessage id={item} />
          <img src={'/assets/images/close-white.svg'} onClick={action} />
        </h2>
        <div className="ez_popup_body">
          <div className="activity-progress">
            <div className="header-activity">
              <div className="ez-label ez-top-margin">
                <FormattedMessage id="doYouWantToDelete" />
                {name} &nbsp;
                <FormattedMessage id={item} />?
              </div>
            </div>
          </div>
          <div className="text-field ez-btn-place">
            <button className="ez-cancel ez-btn ez-cancel-1" onClick={action}>
              <FormattedMessage id="no" />
            </button>
            <button className="ez-button ez-btn" onClick={() => handleDelete(selectedId)}>
              <FormattedMessage id="yes" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeletePopup;
