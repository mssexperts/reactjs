import React from 'react';
import { bool, func, string, number } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import FormattedMessage from './formatted-message';

const TextInput = ({
  className,
  intl,
  name,
  isFocus,
  headerClassName,
  handleBlurChange,
  handleChange,
  handleKeyPress,
  handleOnFocus,
  placeHolder,
  readonly,
  type,
  value,
  labelName,
  errorMessage,
  stringMaxLength,
  stringMinLength,
  minValue,
}) => {
  let placeHolderValue;

  if (placeHolder) {
    placeHolderValue = intl.formatMessage({ id: placeHolder });
  }

  return (
    <div className={`text-field ${headerClassName}`}>
      {labelName && (
        <label className="ez-label ez-top-margin ez-capitalize">
          <FormattedMessage id={labelName} />
        </label>
      )}
      <input
        className={`ez-input ${isFocus ? 'focus' : ''} ${className}`}
        maxLength={stringMaxLength}
        min={minValue}
        minLength={stringMinLength}
        name={name}
        placeholder={placeHolderValue}
        readOnly={readonly}
        type={type}
        value={value || ''}
        onBlur={handleBlurChange}
        onChange={handleChange}
        onFocus={handleOnFocus}
        onKeyPress={handleKeyPress}
      />
      {errorMessage && (
        <label className="ez-label ez-error">
          <img src={'assets/images/round-error-symbol.svg'} />
          <FormattedMessage id={errorMessage} />
        </label>
      )}
    </div>
  );
};

TextInput.propTypes = {
  className: string,
  errorMessage: string,
  focusChange: func,
  handleBlurChange: func,
  handleChange: func.isRequired,
  handleKeyPress: func,
  handleOnFocus: func,
  headerClassName: string,
  intl: intlShape.isRequired,
  isFocus: bool,
  labelName: string,
  minValue: number,
  name: string.isRequired,
  patternValue: string,
  placeHolder: string,
  readonly: string,
  stringMaxLength: number,
  stringMinLength: number,
  type: string.isRequired,
  value: string,
};

TextInput.defaultProps = {
  className: '',
  errorMessage: '',
  headerClassName: '',
  placeHolder: '',
  readonly: '',
  stringMaxLength: 50,
  stringMinLength: 4,
  value: '',
};

export default injectIntl(TextInput);
