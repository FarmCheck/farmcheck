import React from 'react';
import PropTypes from 'prop-types';

const BoxIcon = ({ width, height, className }) => (
  <svg
    enableBackground="new 0 0 24 24"
    className={className}
    height={height}
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m16.12 1.929-10.891 5.576-4.329-2.13 10.699-5.283c.24-.122.528-.122.78 0z" />
    <path d="m23.088 5.375-11.082 5.49-4.15-2.045-.6-.305 10.903-5.575.6.304z" />
    <path d="m11.118 12.447-.012 11.553-10.614-5.539c-.3-.158-.492-.475-.492-.816v-10.688l4.498 2.216v3.896c0 .499.408.913.9.913s.9-.414.9-.913v-2.995l.6.292z" />
    <path d="m23.988 6.969-11.07 5.466-.012 11.553 11.094-5.793z" />
  </svg>
);

BoxIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default BoxIcon;
