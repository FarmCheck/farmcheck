import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HeaderText from 'components/Text/HeaderText';
import NormalText from 'components/Text/NormalText';
import TitleText from 'components/Text/TitleText';
import Space from 'components/Commons/Space';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: ${props => props.justifycontent && 'space-around'};
  padding: ${props => props.padding && '18px 0px;'};
  width: ${props => (props.width ? props.width : '100%')};
`;

const PageTitle = ({ title, subTitle, description }) => (
  <Wrapper
    justifycontent={title}
    width={title ? '50%' : undefined}
    padding={subTitle}
  >
    {title && <HeaderText>{title}</HeaderText>}
    {subTitle && <TitleText>{subTitle}</TitleText>}
    <Space height={12} />
    {description && <NormalText>{description}</NormalText>}
  </Wrapper>
);

PageTitle.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
};

export default PageTitle;
