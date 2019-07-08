import React from 'react';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';
import FormattedMessage from './formatted-message';

const NavigationLink = ({
  className, path, src, tooltip,
}) => (
  <li>
    <NavLink exact activeClassName={className} to={path}>
      <img src={src} />
    </NavLink>
    <span className="left-tooltip">
      <FormattedMessage id={tooltip} />
    </span>
  </li>
);

NavigationLink.propTypes = {
  className: string,
  path: string.isRequired,
  src: string.isRequired,
  tooltip: string,
};

export default NavigationLink;
