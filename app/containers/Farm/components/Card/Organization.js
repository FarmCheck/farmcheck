import React from 'react';
import styled from 'styled-components';
import { HighlightText, Space } from 'components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: 140px;
  height: 182px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => (props.logo ? 'none' : 'center')};
  padding-top: 12px;
  border-radius: 6px;
  border: 1px solid
    ${props => (props.active ? props.theme.primaryColor : '#fff')};
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

const WrapperText = styled.div`
  display: flex;
  justify-contents: center;
  text-align: center;
  width: 100%;
  padding: 12px;
`;

const OrganizationCard = ({ name, logo, active }) => (
  <Wrapper active={active} logo={logo}>
    {logo && (
      <>
        <Img src={logo} />
        <Space height={10} />
      </>
    )}
    <WrapperText>
      <HighlightText line="2">{name}</HighlightText>
    </WrapperText>
  </Wrapper>
);

OrganizationCard.propTypes = {
  name: PropTypes.string,
  logo: PropTypes.string,
  active: PropTypes.bool,
};

export default OrganizationCard;
