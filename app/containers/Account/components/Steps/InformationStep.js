import React from 'react';
import styled from 'styled-components';
import { Form, Checkbox } from 'antd';

import { InputText, Space as Spacing } from 'components';

const LinkText = styled.span`
  cursor: pointer;
  color: ${props => props.theme.primaryColor};
`;

const InformationStep = () => (
  <Form layout="vertical">
    <Form.Item label="Tên nông trại" name="name">
      <InputText style={{ width: 380 }} />
    </Form.Item>
    <Form.Item label="Email" name="email">
      <InputText style={{ width: 380 }} />
    </Form.Item>
    <Form.Item label="Địa chỉ" name="address">
      <InputText style={{ width: 380 }} />
    </Form.Item>
    <Checkbox>
      Tôi đã đọc và chấp nhận với <LinkText>Điều khoản</LinkText>
    </Checkbox>
    <Spacing height={24} />
  </Form>
);

export default InformationStep;
