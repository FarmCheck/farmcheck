import React from 'react';
import styled from 'styled-components';
import { Space } from 'components';
import { Skeleton } from 'antd';

const Wrapper = styled.div`
  width: 86px;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  margin-right: 9px;
  margin-top: 24px;
`;
const Img = styled.div`
  width: 84px;
  height: 55px;
  display: flex;
  justify-content: center;
  border-radius: 6px 6px 0px 0px;
`;
const WrapperText = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 64px;
`;

const CategorySkeleton = () => (
  <Wrapper>
    <Img>
      <Skeleton.Image style={{ width: 54, height: 54 }} size="large" active />
    </Img>
    <Space height={10} />
    <WrapperText>
      <Skeleton.Input
        style={{ width: '60px', alignItems: 'center' }}
        size="small"
        active
      />
    </WrapperText>
  </Wrapper>
);

export default CategorySkeleton;
