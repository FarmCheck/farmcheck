import React from 'react';
import PropTypes from 'prop-types';

const CustomerIcon = ({ width, height, className }) => (
  <svg
    id="Capa_1"
    className={className}
    enableBackground="new 0 0 512 512"
    height={height}
    viewBox="0 0 512 512"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <circle cx="256" cy="119.631" r="87" />
      <circle cx="432" cy="151.63" r="55" />
      <circle cx="80" cy="151.63" r="55" />
      <path d="m134.19 256.021c-21.65-17.738-41.257-15.39-66.29-15.39-37.44 0-67.9 30.28-67.9 67.49v109.21c0 16.16 13.19 29.3 29.41 29.3 70.026 0 61.59 1.267 61.59-3.02 0-77.386-9.166-134.137 43.19-187.59z" />
      <path d="m279.81 241.03c-43.724-3.647-81.729.042-114.51 27.1-54.857 43.94-44.3 103.103-44.3 175.48 0 19.149 15.58 35.02 35.02 35.02 211.082 0 219.483 6.809 232-20.91 4.105-9.374 2.98-6.395 2.98-96.07 0-71.226-61.673-120.62-111.19-120.62z" />
      <path d="m444.1 240.63c-25.17 0-44.669-2.324-66.29 15.39 51.965 53.056 43.19 105.935 43.19 187.59 0 4.314-7.003 3.02 60.54 3.02 16.8 0 30.46-13.61 30.46-30.34v-108.17c0-37.21-30.46-67.49-67.9-67.49z" />
    </g>
  </svg>
);

CustomerIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default CustomerIcon;
