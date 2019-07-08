import React, { Fragment } from 'react';
import { func, bool, string } from 'prop-types';
import FormattedMessage from './formatted-message';

const FileUploadS3 = ({
  className, handleChange, labelName, name, placeholder, loader, errorMessage,
}) => (
  <Fragment>
    <label className="ez-label ez-top-margin ez-capitalize">{labelName && <FormattedMessage id={labelName} />}</label>
    <div className={`file-upload-wrapper ${className}`} data-text={placeholder}>
      <input className="file-upload-field" name={name} type="file" onChange={handleChange} />
      {loader && <span />}
    </div>
    {errorMessage && (
      <label className="ez-label ez-error">
        <img src={'/assets/images/round-error-symbol.svg'} />
        <FormattedMessage id={errorMessage} />
      </label>
    )}
  </Fragment>
);

FileUploadS3.propTypes = {
  className: string,
  errorMessage: string,
  handleChange: func.isRequired,
  isUploadSurveyActive: bool,
  labelName: string,
  loader: bool,
  name: string,
  placeholder: string,
};

FileUploadS3.defaultProps = {
  className: '',
  errorMessage: '',
  labelName: '',
};

export default FileUploadS3;
