import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'antd';
import AccountCard from '../Cards/Account';
import box from '../images/box.png';
import farmer from '../images/farmer.png';
import organization from '../images/organization.png';
import shops from '../images/shops.png';
import truck from '../images/truck.png';

const items = [
  {
    avatar: farmer,
    name: 'Nông trại (3/3)',
    description:
      'Family Farm Seaside là một game mô phỏng nông trại thú vị và đặc sắc. Bạn sẽ quản lý nông trại của mình bằng  . . .',
    background: 'rgba(57, 181, 74, 0.2)',
  },
  {
    avatar: shops,
    name: 'Cửa hàng (0/3)',
    description:
      'Family Farm Seaside là một game mô phỏng nông trại thú vị và đặc sắc. Bạn sẽ quản lý nông trại của mình bằng  . . .',
    background: 'rgba(66, 118, 254, 0.2)',
  },
  {
    avatar: box,
    name: 'Kho chứa (0/3)',
    description:
      'Family Farm Seaside là một game mô phỏng nông trại thú vị và đặc sắc. Bạn sẽ quản lý nông trại của mình bằng  . . .',
    background: 'rgba(250, 173, 20, 0.2)',
  },
  {
    avatar: truck,
    name: 'Vận chuyển (3/3)',
    description:
      'Family Farm Seaside là một game mô phỏng nông trại thú vị và đặc sắc. Bạn sẽ quản lý nông trại của mình bằng  . . .',
    background: 'rgba(244, 67, 54, 0.2)',
  },
  {
    avatar: organization,
    name: 'Cộng tác viên (0/3)',
    description:
      'Family Farm Seaside là một game mô phỏng nông trại thú vị và đặc sắc. Bạn sẽ quản lý nông trại của mình bằng  . . .',
    background: 'rgba(66, 231, 254, 0.2)',
  },
];

const ListAccount = ({ setCurrentStep = {}, url }) => {
  const history = useHistory();

  const handleClick = () => {
    if (url) {
      history.push(url);
    } else {
      setCurrentStep(1);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {items.map(item => (
        <Col key={item.name} span={8}>
          <AccountCard item={item} onClick={handleClick} />
        </Col>
      ))}
    </Row>
  );
};

ListAccount.propTypes = {
  setCurrentStep: PropTypes.func,
  url: PropTypes.string,
};

export default ListAccount;
