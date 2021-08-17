import React, { useState } from 'react';
import styled from 'styled-components';
import { ShopFilled, LeftOutlined, RetweetOutlined } from '@ant-design/icons';
import { Modal, Row, Space } from 'antd';

import { Space as Spacing } from 'components';

import { useSelector } from 'react-redux';
import avatar from 'containers/Account/components/images/avatar.png';
import DetailAccount from './components/Pages/DetailAccount';
import ListAccount from './components/Pages/ListAccount';
import CreateAccount from './components/Pages/CreateAccount';
import StepName from './components/StepName';

const CModal = styled(Modal)`
  position: relative;
  top: 12px !important;
  .ant-modal-header {
    display: none !important;
  }

  .ant-modal-body {
    height: 730px;
    padding: 24px 48px;
  }
`;

const CButton = styled.button`
  display: flex;
  align-items: center;
  width: 254px;
  height: 50px;
  background: rgba(57, 181, 74, 0.1);
  justify-content: space-between;
  border-radius: 6px;
  border: none;
  padding: 0px 18px;
  font-weight: 500;
  color: #595959;
  cursor: pointer;
  &:hover {
    .text {
      color: ${props => props.theme.primaryColor};
    }
    .icon {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const CButtonBack = styled.button`
  position: absolute;
  dispaly: flex;
  justify-content: center;
  align-items: center;
  left: 24px;
  top: 18px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #f5f5f5;
  border: none;
  &:hover {
    .icon {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const CSpace = styled(Space)`
  .text {
    text-align: center;
    white-space: nowrap;
    width: 154px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 600;
  }
`;

const items = [
  {
    id: '1',
    name: 'Nông trại A',
    img: avatar,
    email: 'Âu Cơ, Quận 11, TP Hồ Chí Minh',
  },
  {
    id: '2',
    name: 'Nông trại B',
    img: avatar,
    email: 'Âu Cơ, Quận 11, TP Hồ Chí Minh',
  },
  {
    id: '3',
    name: 'Nông trại C',
    img: avatar,
    email: 'Âu Cơ, Quận 11, TP Hồ Chí Minh',
  },
  {
    id: '4',
    name: 'Nông trại D',
    img: avatar,
    email: 'Âu Cơ, Quận 11, TP Hồ Chí Minh',
  },
];

const AccountModal = () => {
  const entity = useSelector(state => state.farm.item);

  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);

  const listStep = [
    <ListAccount setCurrentStep={setCurrentStep} />,
    <DetailAccount setCurrentStep={setCurrentStep} list={items} />,
    <CreateAccount />,
  ];

  return (
    <>
      <CButton onClick={() => setVisible(true)}>
        <CSpace size="middle">
          <ShopFilled
            style={{
              fontSize: '20px',
              color: '#39B54A',
            }}
          />
          <div className="text">{entity.name}</div>
          <RetweetOutlined style={{ fontSize: 16 }} className="icon" />
        </CSpace>
      </CButton>

      <CModal
        width={1100}
        centered
        visible={visible}
        footer={null}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        {' '}
        <Row justify="center">
          {currentStep !== 0 && (
            <CButtonBack onClick={() => setCurrentStep(currentStep - 1)}>
              <LeftOutlined className="icon" />
            </CButtonBack>
          )}
          <StepName step={currentStep} />
        </Row>
        <Spacing height={36} />
        <Row justify="center">{listStep[currentStep]}</Row>
      </CModal>
    </>
  );
};

export default AccountModal;
