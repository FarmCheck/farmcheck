import React, { useState } from 'react';
import { Switch, Form } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { NameText, InputText, PageTitle } from 'components';

const DivRow = styled.div`
  display: flex;
  margin-bottom: ${props => props.bottom};
  height: auto;
  width: 100%;
`;

function InformationStep({ form, stepID, onSetBodyUpdate = () => {} }) {
  const [showTemStep, setShowTemStep] = useState(false);
  const [showBoxStep, setShowBoxStep] = useState(false);

  return (
    <>
      <PageTitle
        subTitle="Thông tin cơ bản"
        description="Thông tin và thiết lập quy trình cơ bản."
      />
      <Form
        form={form}
        layout="vertical"
        onValuesChange={e => onSetBodyUpdate(e, stepID)}
      >
        <DivRow bottom="20px">
          <Form.Item
            style={{ width: '100%' }}
            label={<NameText>Tên quy trình</NameText>}
            name={`name_${stepID}`}
            rules={[
              {
                required: true,
                message: 'Bạn chưa nhập tên quy trình!',
              },
            ]}
          >
            <InputText size="large" placeholder="Nhập tên quy trình" />
          </Form.Item>
        </DivRow>
        <DivRow bottom="20px">
          <Switch onChange={setShowTemStep} style={{ marginRight: '12px' }} />
          <NameText>
            Hiển thị bước kích hoạt tem khi người dùng thực hiện truy xuất
          </NameText>
        </DivRow>
        {showTemStep && (
          <>
            <DivRow>
              <Form.Item
                style={{ width: '100%' }}
                label={<NameText>Tên công đoạn</NameText>}
                name="name"
              >
                <InputText size="large" placeholder="Nhập tên công đoạn" />
              </Form.Item>
            </DivRow>
            <DivRow>
              <Form.Item
                style={{ width: '100%' }}
                label={<NameText>Mô tả</NameText>}
                name="name"
                rules={[
                  {
                    required: false,
                    message: 'Hãy nhập mô tả',
                  },
                ]}
              >
                <InputText size="large" placeholder="Nhập mô tả" />
              </Form.Item>
            </DivRow>
          </>
        )}
        <DivRow bottom="20px">
          <Switch onChange={setShowBoxStep} style={{ marginRight: '12px' }} />
          <NameText>
            Hiển thị bước đóng thùng khi người dùng thực hiện truy xuất
          </NameText>
        </DivRow>
        {showBoxStep && (
          <>
            <DivRow>
              <Form.Item
                style={{ width: '100%' }}
                label={<NameText>Tên công đoạn</NameText>}
                name="name"
              >
                <InputText size="large" placeholder="Nhập tên công đoạn" />
              </Form.Item>
            </DivRow>
            <DivRow>
              <Form.Item
                style={{ width: '100%' }}
                label={<NameText>Mô tả</NameText>}
                name="name"
                rules={[
                  {
                    required: false,
                    message: 'Hãy nhập mô tả',
                  },
                ]}
              >
                <InputText size="large" placeholder="Nhập mô tả" />
              </Form.Item>
            </DivRow>
          </>
        )}
        <DivRow>
          <span style={{ color: 'red', marginRight: '6px' }}>(*)</span>
          Thông tin bắt buộc
        </DivRow>
      </Form>
    </>
  );
}

InformationStep.propTypes = {
  form: PropTypes.any,
  stepID: PropTypes.string,
  onSetBodyUpdate: PropTypes.func,
};

export default InformationStep;
