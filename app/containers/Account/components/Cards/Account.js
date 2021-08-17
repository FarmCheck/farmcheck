import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Space, TitleText, NormalText } from 'components';

const Wrapper = styled.div`
  width: 100%;
  height: 282px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 24px;
`;

const WrapperAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.background};
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
`;

const AccountCard = ({ item, onClick }) => (
  <Wrapper onClick={onClick}>
    <WrapperAvatar background={item.background}>
      <Avatar src={item.avatar} />
    </WrapperAvatar>
    <Space height={18} />
    <TitleText fontSize="16px">{item.name}</TitleText>
    <Space height={6} />
    <NormalText>{item.description}</NormalText>
  </Wrapper>
);

AccountCard.propTypes = {
  onClick: PropTypes.func,
  item: PropTypes.object,
};

export default AccountCard;
