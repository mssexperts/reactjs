import React from 'react';
import { Link } from 'react-router-dom';
import FormattedMessage from './common/formatted-message';

const NotFound = () => (
  <div className="ez-wrapper">
    <div className="ez-error-page-content">
      <div className="ez-error-page">
        <img src={'/assets/images/warning.svg'} />
        <h3>
          <FormattedMessage id="weCouldNotFindPage" />
        </h3>
        <p>
          <FormattedMessage id="errorCode404" />
        </p>
        <Link className="ez-button-small" to="/">
          <FormattedMessage id="returnToPreviousScreen" />
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
