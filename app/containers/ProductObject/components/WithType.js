import React from 'react';
import PropTypes from 'prop-types';

const WithType = WrappedComponent => {
  const HOC = props => {
    const data = [
      {
        type: 0,
        name: 'Đối tượng vùng',
        path: 'field-plant',
        sectionName: 'Mùa vụ',
      },
      {
        type: 1,
        name: 'Đối tượng nuôi trồng',
        path: 'farming-plant',
        sectionName: 'Mùa vụ',
      },
      {
        type: 2,
        name: 'Đối tượng sản xuất',
        path: 'production-plant',
        sectionName: 'Lô mẻ',
      },
    ];

    const { type } = props;

    return <WrappedComponent productObject={data[type]} {...props} />;
  };

  HOC.propTypes = {
    type: PropTypes.number,
  };

  return HOC;
};

export default WithType;
