import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Form, Input } from 'antd';
import NameText from 'components/Text/NameText';
import InputText from 'components/Form/InputText';

const CModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;

    .ant-modal-header {
      .ant-modal-title {
        font-weight: 700;
      }
    }

    .ant-modal-footer {
      padding: 18px 24px;

      button {
        &:first-child {
          width: 112px;
          height: 42px;
          border: 0;
          font-weight: 500;
        }

        &:last-child {
          width: 112px;
          height: 42px;
          font-weight: 500;
        }
      }
    }
  }
`;

const CFormItem = styled(Form.Item)`
  display: block !important;

  .ant-col.ant-form-item-label {
    margin-bottom: 6px;
  }
`;

const ModalCreateRequire = ({ visible, closeModal }) => (
  <CModal
    title="Thư ngỏ liên kêt"
    visible={visible}
    okText="Gửi thư"
    cancelText="Hủy bỏ"
    onCancel={closeModal}
  >
    <Form name="nest-messages">
      <CFormItem
        name={['user', 'name']}
        label={<NameText>Tên cửa hàng</NameText>}
        required={false}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputText />
      </CFormItem>
      <CFormItem
        name={['user', 'introduction']}
        label={<NameText>Nội dung</NameText>}
      >
        <Input.TextArea rows={6} />
      </CFormItem>
    </Form>
  </CModal>
);

ModalCreateRequire.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default ModalCreateRequire;
