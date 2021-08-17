import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ArrowRightOutlined } from '@ant-design/icons';

import { TitleText, NormalText, ImgSkeleton } from 'components';

import { detechTime } from 'commons/functionUtils';

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
  width: auto;
`;

const Img = styled.img`
  width: 64px;
  height: 64px;
  border: 4px solid #ffffff;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1));
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
`;

const BorderIcon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid #8c8c8c;
`;

const FarmCard = ({ item, onSelectedFarm }) => (
  <Wrapper
    onClick={() => {
      onSelectedFarm(item.id);
    }}
  >
    <InfoCard>
      {item.img ? (
        <Img src={item.img} />
      ) : (
        <ImgSkeleton width={64} height={64} />
      )}
      <WrapperText>
        <TitleText>{item.name}</TitleText>
        <NormalText>Truy cập: {detechTime(item.updatedAt)}</NormalText>
      </WrapperText>
    </InfoCard>
    <BorderIcon>
      <ArrowRightOutlined style={{ fontSize: '15px' }} />
    </BorderIcon>
  </Wrapper>
);

FarmCard.propTypes = {
  item: PropTypes.object,
  onSelectedFarm: PropTypes.func,
};

export default FarmCard;
