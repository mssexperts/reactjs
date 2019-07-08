import React, { Component } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import FormattedMessage from '../common/formatted-message';

class SideNavEnterprise extends Component {
  static propTypes = {
    activeEnterpriseId: string.isRequired,
    closeSideNav: func.isRequired,
    enterprise: arrayOf(
      shape({
        expirationDate: string.isRequired,
        isActive: bool.isRequired,
        name: string.isRequired,
      })
    ),
    handleBackToAdmin: func.isRequired,
    handleClickOutside: func.isRequired,
    isActive: bool.isRequired,
    onEnterpriseClick: func.isRequired,
    shouldShowBackToAdmin: bool.isRequired,
  };

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  dropdownMenu = React.createRef();

  handleBodyClick = (event) => {
    if (!this.dropdownMenu.current.contains(event.target)) {
      this.props.handleClickOutside(event);
    }
  };

  render() {
    const {
      activeEnterpriseId, closeSideNav, enterprise, handleBackToAdmin, isActive, onEnterpriseClick, shouldShowBackToAdmin,
    } = this.props;

    return (
      <div className={`side_enterprise ${isActive && 'active'}`} ref={this.dropdownMenu}>
        <ul>
          <img src={'/assets/images/close-theme.svg'} onClick={closeSideNav} />
          {enterprise.map(
            (item, key) => key < 10 && (
              <li className={`${activeEnterpriseId === item.companyId && 'active'}`} key={key} onClick={() => onEnterpriseClick(item)}>
                {item.name}
              </li>
            )
          )}
          {shouldShowBackToAdmin && (
            <button className="dropbtn back_to_admin ez-button ez-width-auto" onClick={handleBackToAdmin}>
              <FormattedMessage id="backToAdmin" />
            </button>
          )}
        </ul>
      </div>
    );
  }
}

export default SideNavEnterprise;
