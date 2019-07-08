import React from 'react';
import { arrayOf, func, string, shape, oneOfType, bool } from 'prop-types';
import FormattedMessage from './formatted-message';

const Dropdown = ({
  className, options, labelName, name, handleChange, value, placeholder,
}) => (
  <div className={`text-field ${className}`}>
    {labelName && (
      <label className="ez-label ez-top-margin">
        <FormattedMessage id={labelName} />
      </label>
    )}
    <select className="ez-select" name={name} value={value} onChange={handleChange}>
      {placeholder ? <FormattedMessage id={placeholder} tagName="option" /> : ''}
      {options.map((option, key) => (
        <option key={key} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

Dropdown.propTypes = {
  className: string,
  handleChange: func,
  labelName: string,
  name: string.isRequired,
  options: arrayOf(
    shape({
      name: string.isRequired,
      value: string.isRequired,
    })
  ),
  placeholder: string,
  value: oneOfType([bool, string]),
};

Dropdown.defaultProps = { className: '' };
export default Dropdown;
