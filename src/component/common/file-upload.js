import React from 'react';
import { string, func } from 'prop-types';
import FormattedMessage from './formatted-message';

const FileUpload = ({
  fileName, size, handleChange, labelName, name, url,
}) => (
  <div className="text-field ez-choose-file">
    <label className="ez-label ez-top-margin ">
      <FormattedMessage id={labelName} />
    </label>
    <div className="upload-btn-wrapper">
      <button className="btn">
        <FormattedMessage id="uploadFile" />
      </button>
      <input className="ez-file ez-button" name={name} type="file" onChange={handleChange} />
    </div>
    <span className="ez-text-center recomended-error">
      <FormattedMessage id={size} />
    </span>
    {url && (
      <div className="file-img">
        <img src={url} />
      </div>
    )}
    {fileName && <p>{fileName} </p>}
  </div>
);

FileUpload.propTypes = {
  fileName: string,
  handleChange: func.isRequired,
  labelName: string.isRequired,
  name: string.isRequired,
  size: string.isRequired,
  url: string,
};

export default FileUpload;
