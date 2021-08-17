import React from 'react';
import styled from 'styled-components';
import { HighlightText, Space } from 'components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-shrink: 0;
  justify-content: flex-start;
  align-items: center;
`;

const Img = styled.img`
  width: 48px;
  height: 48px;
`;

const CheckBoxCard = ({ name, logo }) => (
  <Wrapper>
    <Img src={logo} />
    <Space width={24} />
    <HighlightText line="1">{name}</HighlightText>
  </Wrapper>
);

CheckBoxCard.propTypes = {
  name: PropTypes.string,
  logo: PropTypes.string,
};

export default CheckBoxCard;
