import React, { useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Form } from 'antd';

import { Space as Spacing, CButton, NameText, InputText } from 'components';

const CButtonMain = styled(Button)`
  width: 220px !important;
  height: 130px !important;
  flex-shrink: 0;
`;
const ContentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CButtonAddProduction = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <CButtonMain type="dashed" block onClick={showModal}>
        <ContentButton>
          <PlusOutlined style={{ fontSize: '30px' }} />
          <Spacing height={10} />
          <NameText>Thêm bộ sưu tập</NameText>
        </ContentButton>
      </CButtonMain>
      <Modal
        bodyStyle={{ width: 500 }}
        title="Thêm chứng nhận"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <CButton key="1" onClick={handleCancel}>
            Hủy
          </CButton>,
          <CButton key="2" onClick={handleOk} type="primary">
            Xác nhận
          </CButton>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item name="name" label="Nhập tên bộ sưu tập">
            <InputText />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CButtonAddProduction;
