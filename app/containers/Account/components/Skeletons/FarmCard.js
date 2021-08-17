import React from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  border-radius: 6px;
  justify-content: space-between;
  padding-right: 12px;
  margin-bottom: 24px;
`;

const InfoCard = styled.div`
  display: flex;
  width: auto;
`;
const Img = styled.div`
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  border-radius: 50%;
`;

const WrapperText = styled.div`
  width: auto;
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 12px;
  cursor: pointer;
  padding: 6px 0px;
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
