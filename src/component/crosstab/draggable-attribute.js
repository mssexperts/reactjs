import React from 'react';
import { string } from 'prop-types';

const DraggableAttribute = ({ name }) => (
  <li data-id={name}>
    <span className="pvtAttr ">{name} </span>
  </li>
);

DraggableAttribute.propTypes = { name: string.isRequired };

export default DraggableAttribute;
