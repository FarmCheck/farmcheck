import React from 'react';
import styled from 'styled-components';
import { NameText, Space as Spacing, TitleText } from 'components';
import { PictureOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: 220px;
  height: 200px;
  display: flex;
  flex-direction: column;

  &:hover {
    .action {
      opacity: 1;
    }
  }
`;

const WrapperImg = styled.div`
  position: relative;
`;

const WrapperAction = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  opacity: 0;
  top: 0px;
`;

const ProductionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100px;
  height: 130px;
  right: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
`;

const Img = styled.img`
  width: 220px;
  height: 130px;
`;

const ProductionCard = ({ name, logo }) => (
  <Wrapper>
    <WrapperImg>
      <Img src={logo} />
      <ProductionInfo>
        <TitleText style={{ color: '#fff' }}>12</TitleText>
        <Spacing height={10} />
        <PictureOutlined style={{ color: '#fff', fontSize: '24px' }} />
      </ProductionInfo>
      <WrapperAction className="action">
        <TitleText style={{ color: '#fff' }}>XEM TẤT CẢ</TitleText>
      </WrapperAction>
    </WrapperImg>
    <Spacing height={12} />
    <NameText line="2">{name}</NameText>
  </Wrapper>
);

ProductionCard.propTypes = {
  name: PropTypes.string,
  logo: PropTypes.string,
};

export default ProductionCard;
