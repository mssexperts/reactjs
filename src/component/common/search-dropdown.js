import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import Select from 'react-select';
import FormattedMessage from './formatted-message';

const SearchDropdown = ({
  placeHolder, handleChange, labelName, options, value,
}) => {
  const placeholder = <FormattedMessage id={placeHolder} />;

  return (
    <div className="text-field">
      {labelName && (
        <label className="ez-label ez-top-margin ez-capitalize">
          <FormattedMessage id={labelName} />
        </label>
      )}
      {<Select getOptionLabel={(option) => option.name} options={options} placeholder={placeholder} value={value} onChange={handleChange} />}
    </div>
  );
};

const valueShape = shape({
  name: string,
  value: string,
});

SearchDropdown.propTypes = {
  handleChange: func.isRequired,
  labelName: string,
  options: arrayOf(valueShape).isRequired,
  placeHolder: string.isRequired,
  value: valueShape,
};

SearchDropdown.defaultProps = { labelName: '' };

export default SearchDropdown;
