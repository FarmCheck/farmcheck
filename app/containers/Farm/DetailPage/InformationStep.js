import PropTypes from 'prop-types';
import { Form } from 'antd';
import React from 'react';
import 'react-quill/dist/quill.snow.css';

import {
  NameText,
  CFormItem,
  InputText,
  PageTitle,
  CTextArea,
} from 'components';

export function InformationStep({ form, onSetBodyUpdate }) {
  return (
    <>
      <PageTitle
        subTitle="Thông tin đối tượng nuôi trồng"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
        tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <Form
        form={form}
        style={{ marginTop: '20px' }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 11 }}
        layout="horizontal"
        labelAlign="left"
        onValuesChange={onSetBodyUpdate}
      >
        <CFormItem
          name="name"
          label={<NameText>Tên nông trại</NameText>}
          rules={[
            {
              required: true,
              message: 'Bạn chưa nhập tên nông trại',
            },
          ]}
        >
          <InputText size="large" />
        </CFormItem>

        <CFormItem
          name="description"
          label={<NameText>Giới thiệu nông trại</NameText>}
        >
          <CTextArea rows={4} />
        </CFormItem>
        <CFormItem
          name="story"
          label={<NameText>Câu chuyện nông trại</NameText>}
        >
          <CTextArea rows={8} />
        </CFormItem>
      </Form>
    </>
  );
}

InformationStep.propTypes = {
  form: PropTypes.object,
  onSetBodyUpdate: PropTypes.func,
};

export default InformationStep;
