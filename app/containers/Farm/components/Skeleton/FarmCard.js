import React from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 456px;
  height: auto;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  padding: 18px 24px;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const InfoCard = styled.div`
  display: flex;
`;
const Img = styled.div`
  width: 64px;
  height: 64px;
  border: 4px solid #ffffff;
  box-sizing: border-box;
  border-radius: 50%;
`;

const WrapperText = styled.div`
  width: 100%;
  height: 64px;
  margin-left: 12px;
`;

const FarmCardSkeleton = () => (
  <Wrapper>
    <InfoCard>
      <Img>
        <Skeleton.Avatar size="large" active />
      </Img>
      <WrapperText>
        <Skeleton.Input
          size="small"
          style={{ width: 300, marginBottom: 12 }}
          active
        />
        <Skeleton.Input size="small" style={{ width: 300 }} active />
      </WrapperText>
    </InfoCard>
  </Wrapper>
);

export default FarmCardSkeleton;
