import React from 'react';
import { bool, arrayOf, func, shape, string } from 'prop-types';
import SearchDropdown from '../common/search-dropdown';
import FormattedMessage from '../common/formatted-message';

const SwitchEnterprise = ({
  selectedOption, handleClick, handleSelectChange, enterprisesList, shouldShowSwitchEnterprise,
}) => (shouldShowSwitchEnterprise ? (
  <SearchDropdown
    className="ez-dropbtn ez-button-white"
    handleChange={handleSelectChange}
    handleClick={handleClick}
    options={enterprisesList}
    placeHolder="switchEnterprise"
    value={selectedOption}
  />
) : (
  <button className="dropbtn back_to_admin ez-button ez-width-auto" onClick={handleClick}>
    <FormattedMessage id="backToAdmin" />
  </button>
));

SwitchEnterprise.propTypes = {
  enterprisesList: arrayOf(
    shape({
      expirationDate: string.isRequired,
      isActive: bool.isRequired,
      name: string.isRequired,
    })
  ),
  handleClick: func.isRequired,
  handleSelectChange: func.isRequired,
  selectedOption: shape({
    name: string.isRequired,
    value: string.isRequired,
  }),
  shouldShowSwitchEnterprise: bool.isRequired,
};

export default SwitchEnterprise;
