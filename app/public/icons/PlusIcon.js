import React from 'react';
import PropTypes from 'prop-types';

const PlusIcon = ({ width, height, className }) => (
  <svg
    height={height}
    className={className}
    viewBox="0 0 469.33333 469.33333"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0" />
  </svg>
);

PlusIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default PlusIcon;
