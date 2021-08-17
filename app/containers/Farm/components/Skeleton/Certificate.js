import React from 'react';
import styled from 'styled-components';
import { Space } from 'components';
import { Skeleton } from 'antd';

const Wrapper = styled.div`
  width: 140px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
`;
const Img = styled.div`
  width: 48px;
  height: 48px;
`;
const WrapperText = styled.div`
  display: flex;
  justify-contents: center !important;
  text-align: center;
  width: 100%;
`;

const CertificateSkeleton = () => (
  <Wrapper>
    <Img>
      <Skeleton.Avatar size="large" active />
    </Img>
    <Space height={10} />
    <WrapperText>
      <Skeleton.Input
        style={{ width: '100px', alignItems: 'center' }}
        size="small"
        active
      />
    </WrapperText>
  </Wrapper>
);

export default CertificateSkeleton;
