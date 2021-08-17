import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { RightOutlined } from '@ant-design/icons';

import { ImgSkeleton, NameText, NormalText } from 'components';

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

const Img = styled.img`
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

const Item = ({ item, onSelected }) => (
  <Wrapper onClick={() => onSelected(item.id)}>
    <InfoCard>
      {item.img ? (
        <Img src={item.img} />
      ) : (
        <ImgSkeleton width={64} height={64} />
      )}
      <WrapperText>
        <NameText>{item.name}</NameText>
        <NormalText>{item.email}</NormalText>
      </WrapperText>
    </InfoCard>
    <RightOutlined style={{ fontSize: '15px' }} />
  </Wrapper>
);

Item.propTypes = {
  item: PropTypes.object,
  onSelected: PropTypes.func,
};

export default Item;
