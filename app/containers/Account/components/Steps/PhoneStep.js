import React from 'react';
import styled from 'styled-components';
import { Form } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

import { TitleText, Space as Spacing, InputText, NormalText } from 'components';

const WrapperText = styled.div`
  text-align: center;
`;

const PhoneStep = () => (
  <>
    <WrapperText>
      <TitleText>Đăng ký vào kênh nông trại</TitleText>
    </WrapperText>
    <Spacing height={12} />
    <WrapperText>
      <NormalText>
        Vui lòng nhập số điện thoại của bạn để xác thực thông tin
      </NormalText>
    </WrapperText>
    <Spacing height={36} />
    <Form>
      <Form.Item name="number">
        <InputText
          placeholder="Nhập số điện thoại"
          prefix={<PhoneOutlined />}
          style={{ width: 380 }}
        />
      </Form.Item>
    </Form>
  </>
);

export default PhoneStep;
