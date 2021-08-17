import React from 'react';
import styled from 'styled-components';
import { NameText, Space } from 'components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: 140px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${props => (props.active ? '1px solid #39B54A' : '')};
  padding: 12px;
`;
const Img = styled.img`
  width: 48px;
  height: 48px;
`;
const WrapperText = styled.div`
  display: flex;
  justify-contents: center;
  text-align: center;
  width: 100%;
`;

const CertificateCard = ({ active, name, logo }) => (
  <Wrapper active={active}>
    <Img src={logo} />
    <Space height={10} />
    <WrapperText>
      <NameText line="2">{name}</NameText>
    </WrapperText>
  </Wrapper>
);

CertificateCard.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  logo: PropTypes.string,
};

export default CertificateCard;
