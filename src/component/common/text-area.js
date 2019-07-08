import React from 'react';
import { func, string } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import FormattedMessage from './formatted-message';

const TextArea = ({
  intl, name, handleChange, handleKeyPress, placeHolder, value, labelName, focusChange, errorMessage,
}) => {
  let placeHolderValue;

  if (placeHolder) {
    placeHolderValue = intl.formatMessage({ id: placeHolder });
  }

  return (
    <div className="text-field">
      {labelName && (
        <label className="ez-label ez-top-margin ez-capitalize">
          <FormattedMessage id={labelName} />
        </label>
      )}
      <textarea
        className="ez-input"
        name={name}
        placeholder={placeHolderValue}
        value={value}
        onBlur={focusChange}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {errorMessage && (
        <label className="ez-label ez-error">
          <img src="assets/images/round-error-symbol.svg" />
          <FormattedMessage id={errorMessage} />
        </label>
      )}
    </div>
  );
};

TextArea.propTypes = {
  errorMessage: string,
  focusChange: func,
  handleChange: func.isRequired,
  handleKeyPress: func,
  intl: intlShape.isRequired,
  labelName: string,
  name: string.isRequired,
  placeHolder: string,
  value: string,
};

TextArea.defaultProps = {
  errorMessage: '',
  placeHolder: '',
  readonly: '',
  value: '',
};

export default injectIntl(TextArea);
