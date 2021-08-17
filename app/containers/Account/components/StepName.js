import React from 'react';
import PropTypes from 'prop-types';
import { TitleText } from 'components';

const StepName = ({ step }) => {
  switch (step) {
    case 0:
      return <TitleText>Lựa chọn các tài khoản</TitleText>;
    default:
      return <TitleText>Tài khoản nông trại</TitleText>;
  }
};

StepName.propTypes = {
  step: PropTypes.number,
};

export default StepName;
