import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NormalText, Space, ImgSkeleton } from 'components';

const Wrapper = styled.div`
  width: 86px;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${props => (props.active ? '1px solid #39B54A' : '')};
  border-radius: 6px;
  margin-right: 9px;
  margin-top: 24px;
`;

const Img = styled.img`
  width: 84px;
  height: 55px;
  border-radius: 6px 6px 0px 0px;
`;

const WrapperText = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 64px;
`;

const CategoryCard = ({ active, name, logo }) => (
  <Wrapper active={active}>
    {logo ? <Img src={logo} /> : <ImgSkeleton width={84} height={55} />}
    <Space height={10} />
    <WrapperText>
      <NormalText style={{ fontSize: '12px', lineHeight: '18px' }}>
        {name}
      </NormalText>
    </WrapperText>
  </Wrapper>
);

CategoryCard.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  logo: PropTypes.string,
};

export default CategoryCard;
