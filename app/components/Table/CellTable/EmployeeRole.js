import React from 'react';
import NormalText from 'components/Text/NormalText';
import PropTypes from 'prop-types';

const EmployeeRole = ({ role }) => {
  switch (role) {
    case 0:
      return <NormalText>Nhân viên</NormalText>;
    case 1:
      return <NormalText>Nông dân</NormalText>;
    case 2:
      return <NormalText>Quản lý</NormalText>;
    default:
      return <NormalText>Trống</NormalText>;
  }
};

EmployeeRole.propTypes = {
  role: PropTypes.number,
};

export default EmployeeRole;
