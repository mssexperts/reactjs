import React, { Component } from 'react';
import { func, node, string } from 'prop-types';

class PopUp extends Component {
  static propTypes = {
    action: func.isRequired,
    children: node.isRequired,
    popupId: string,
  };

  render() {
    const {
      action, children, popupId,
    } = this.props;

    return (
      <div className="ez_popup_outer" id={popupId || 'popup'}>
        <div className="ez_overlay" id="ez_overlay" onClick={action} />
        {children}
      </div>
    );
  }
}
export default PopUp;
