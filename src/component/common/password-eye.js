import React, { PureComponent } from 'react';
import { string, func } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import FormattedMessage from './formatted-message';

class PasswordEye extends PureComponent {
  static propTypes = {
    handleChange: func.isRequired,
    handleKeyPress: func,
    handleKeyUp: func,
    intl: intlShape.isRequired,
    labelName: string.isRequired,
    name: string.isRequired,
    placeHolder: string.isRequired,
    value: string,
  };

  state = {
    isFocus: false,
    isVisible: true,
  };

  toggleEye = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  handleOnFocus = () => {
    this.setState({ isFocus: true });
  };

  handleBlurChange = () => {
    this.setState({ isFocus: false });
  };

  render() {
    const {
      intl, labelName, name, handleChange, handleKeyUp, handleKeyPress, placeHolder, value,
    } = this.props;

    const {
      isFocus, isVisible,
    } = this.state;

    const placeHolderValue = intl.formatMessage({ id: placeHolder });

    return (
      <div className="text-field">
        <label className="ez-label ez-top-margin ">
          <FormattedMessage id={labelName} />
        </label>
        <div className="ez-img-input">
          <input
            className={`ez-input ${isFocus ? 'focus' : ''}`}
            name={name}
            placeholder={placeHolderValue}
            type={`${isVisible ? 'password' : 'text'}`}
            value={value}
            onBlur={this.handleBlurChange}
            onChange={handleChange}
            onFocus={this.handleOnFocus}
            onKeyPress={handleKeyPress}
            onKeyUp={handleKeyUp}
          />
          <img className="ez-eye" src={`/assets/images/${isVisible ? 'eye-open.svg' : 'eye-open-theme.svg'}`} onClick={this.toggleEye} />
        </div>
      </div>
    );
  }
}

export default injectIntl(PasswordEye);
