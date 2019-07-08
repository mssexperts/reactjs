import React, { PureComponent } from 'react';
import { arrayOf, func, shape, string, object } from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import FormattedMessage from './formatted-message';

class MenuDropDown extends PureComponent {
  static propTypes = {
    className: string,
    items: arrayOf(
      shape({
        onClickHandler: func.isRequired,
        text: object.isRequired,
      })
    ).isRequired,
    srcUrl: string.isRequired,
    tooltip: string,
  };

  static defaultPropTypes = { className: '' };

  state = { shouldShowMenudropdown: false };

  handleClickOutside = () => {
    this.setState({ shouldShowMenudropdown: false });
  };

  toggleMenudropdown = () => {
    this.setState({ shouldShowMenudropdown: !this.state.shouldShowMenudropdown });
  };

  renderMenuItems = (items) => items.map(({
    text, onClickHandler,
  }, key) => (
    <li key={key}>
      <button onClick={onClickHandler}>{text}</button>
    </li>
  ));

  render() {
    const { shouldShowMenudropdown } = this.state;

    return (
      <div className="ez-nav-user" onClick={this.toggleMenudropdown}>
        <img src={this.props.srcUrl} />
        {!!this.props.tooltip && (
          <span className="left-tooltip">
            <FormattedMessage id={this.props.tooltip} />
          </span>
        )}
        {shouldShowMenudropdown && (
          <div className={`ez-dropdown-content ez-show ez-myDropdown1 ${this.props.className}`}>
            <ul>{this.renderMenuItems(this.props.items)}</ul>
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(MenuDropDown);
