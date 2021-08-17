import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Row from 'components/Commons/Row';
import Space from 'components/Commons/Space';

const Price = styled.span`
  color: #faad14;
  font-weight: 700;
  font-size: ${props => (props.size ? props.size : 16)}px;
`;

const Unix = styled.span`
  margin-bottom: 2px;
  font-size: 12px;
  color: #faad14;
`;

const PriceText = ({ price, size }) => (
  <Row alignItems="flex-end">
    <Price size={size}>{price}</Price>
    <Space width={2} />
    <Unix>VNĐ</Unix>
  </Row>
);

PriceText.propTypes = {
  price: PropTypes.string,
  size: PropTypes.number,
};

export default PriceText;
