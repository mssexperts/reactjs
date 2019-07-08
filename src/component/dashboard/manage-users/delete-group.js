import React from 'react';
import { func } from 'prop-types';
import FormattedMessage from '../../common/formatted-message';

const DeleteGroup = ({
  deleteGroup, hideModal,
}) => (
  <div className="ez_popup_outer ez-delete-popup">
    <div className="ez_overlay">
      <div className="ez_popup">
        <h2>
          <FormattedMessage id="deleteGroup" />
        </h2>
        <img src={'/assets/images/close.svg'} onClick={hideModal} />
        <div className="popup-body">
          <div className="text-field">
            <label>
              <FormattedMessage id="doYouWantToDeleteGroup" />
            </label>
          </div>
          <div className="text-field ez-btn-place">
            <button className="ez-cancel ez-btn ez-cancel-1" onClick={hideModal}>
              <FormattedMessage id="no" />
            </button>
            <button className="ez-button ez-btn" onClick={deleteGroup}>
              <FormattedMessage id="yes" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

DeleteGroup.propTypes = {
  deleteGroup: func.isRequired,
  hideModal: func.isRequired,
};
export default DeleteGroup;
