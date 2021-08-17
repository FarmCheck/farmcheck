import React from 'react';
import styled from 'styled-components';
import { Steps } from 'antd';
import { FileSearchOutlined, CheckSquareOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Step } = Steps;

const CStep = styled(Step)`
  height: 40px;
`;

const StepHeader = ({ id, name }) => {
  switch (id) {
    case 'first':
      return (
        <CStep
          icon={<FileSearchOutlined style={{ fontSize: '30px' }} />}
          title={name}
        />
      );
    case 'last':
      return (
        <CStep
          icon={<CheckSquareOutlined style={{ fontSize: '30px' }} />}
          title={name}
        />
      );
    default:
      return <Step title={name} />;
  }
};

StepHeader.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};

export default StepHeader;
