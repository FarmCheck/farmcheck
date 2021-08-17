import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FileImageOutlined } from '@ant-design/icons';

const Wapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: #f6fcf9;
  border-radius: 6px;
`;

const ImgSkeleton = ({ width, height }) => (
  <Wapper width={width} height={height}>
    <FileImageOutlined style={{ fontSize: '30px', color: '#8c8c8c' }} />
  </Wapper>
);

ImgSkeleton.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ImgSkeleton;
