import React from 'react';
import { string, oneOf } from 'prop-types';
import { FormattedMessage as FormattedMessageComponent } from 'react-intl';
import en from '../../reducers/languages/en';

const FormattedMessage = ({
  id, tagName,
}) => <FormattedMessageComponent id={id} tagName={tagName} />;

FormattedMessage.propTypes = {
  id: oneOf(Object.keys(en.messages)).isRequired,
  tagName: string,
};

FormattedMessage.defaultProps = { tagName: 'span' };

export default FormattedMessage;
