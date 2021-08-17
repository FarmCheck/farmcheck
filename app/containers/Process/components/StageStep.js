import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Switch, Form, Divider, Button, Space } from 'antd';

import {
  NameText,
  InputText,
  CSelect,
  PageTitle,
  Notification,
} from 'components';

import { inputTypes } from 'containers/Process/commons/data';

const WrapperCard = styled.div`
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid
    ${props =>
      props.isFocusing
        ? props.theme.primaryColor
        : props.theme.borderColorBase};
`;

const DivRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.bottom};
  height: auto;
  width: 100%;
`;

const CFormItem = styled(Form.Item)`
  width: 30%;
`;

const CFormItemSwitch = styled(Form.Item)`
  margin-bottom: 0px !important;
`;

const WrapperEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #fff5f6;
  color: red;
  border-radius: 6px;
  margin-bottom: 12px;
`;

function StageStep({ form, stepID }) {
  const [focusingItem, setFocusingItem] = useState(0);

  const checkIsFullFill = propsStep => {
    if (
      propsStep.name &&
      propsStep.name !== '' &&
      propsStep.value &&
      propsStep.value !== ''
    ) {
      return true;
    }
    return false;
  };

  const handleAdd = add => {
    const propsStep = form.getFieldValue(`stepProperties_${stepID}`);
    if (!propsStep || propsStep.length === 0) {
      add();
      return;
    }

    if (checkIsFullFill(propsStep[propsStep.length - 1])) {
      add();
    } else {
      Notification('warning', 'Chưa hoàn thành trường hiện tại');
    }
  };

  return (
    <>
      <PageTitle
        subTitle={stepID === 'end' ? 'Thu hoạch' : 'Thông tin cơ bản'}
        description={
          stepID === 'end'
            ? 'Thông tin thu hoạch'
            : 'Thông tin và thiết lập quy trình cơ bản'
        }
      />
      <Form form={form} layout="vertical">
        <DivRow>
          <Form.Item
            style={{ width: '100%' }}
            label={<NameText>Tên công đoạn</NameText>}
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
        <DivRow>
          <Form.Item
            style={{ width: '100%' }}
            label={<NameText>Mô tả</NameText>}
            name={`description_${stepID}`}
          >
            <InputText size="large" placeholder="Nhập mô tả" />
          </Form.Item>
        </DivRow>
        <DivRow borderBot bottom="24px">
          <CFormItemSwitch
            name={`isInternal_${stepID}`}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch style={{ marginRight: 12 }} />
          </CFormItemSwitch>
          <NameText left="20px">
            Công đoạn nội bộ (không hiển thị khi quét tem QR)
          </NameText>
        </DivRow>
        <Divider />
        <Form.List name={`stepProperties_${stepID}`}>
          {(fields, { add, remove }) => (
            <>
              <DivRow style={{ justifyContent: 'space-between' }} bottom="24px">
                <NameText>Thông tin ghi nhận khi sản xuất</NameText>
                <Button
                  onClick={() => handleAdd(add)}
                  type="primary"
                  style={{ marginLeft: '10px' }}
                  size="large"
                >
                  Tạo mới
                </Button>
              </DivRow>
              {fields.length === 0 && (
                <WrapperEmpty>
                  Chưa có trường thông tin ghi nhận sản xuất
                </WrapperEmpty>
              )}
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <WrapperCard
                  key={key}
                  isFocusing={focusingItem === name}
                  onClick={() => setFocusingItem(name)}
                >
                  <DivRow bottom="24px">
                    <NameText>{`Thông tin ${name}`}</NameText>
                    <Space>
                      <Button
                        type="link"
                        danger
                        onClick={() => {
                          remove(name);
                        }}
                      >
                        <span style={{ textDecorationLine: 'underline' }}>
                          Xóa
                        </span>
                      </Button>
                    </Space>
                  </DivRow>
                  <DivRow>
                    <CFormItem
                      {...restField}
                      name={[name, 'name']}
                      fieldKey={[fieldKey, 'name']}
                    >
                      <InputText size="large" placeholder="Nhập tên trường" />
                    </CFormItem>
                    <CFormItem
                      {...restField}
                      name={[name, 'type']}
                      fieldKey={[fieldKey, 'type']}
                      initialValue="0"
                    >
                      <CSelect list={inputTypes} />
                    </CFormItem>
                    <CFormItem
                      {...restField}
                      name={[name, 'value']}
                      fieldKey={[fieldKey, 'value']}
                    >
                      <InputText
                        size="large"
                        placeholder="Nhập giá trị mặc định"
                      />
                    </CFormItem>
                  </DivRow>
                  <DivRow>
                    <Space>
                      <CFormItemSwitch
                        {...restField}
                        name={[name, 'isRequired']}
                        fieldKey={[fieldKey, 'isRequired']}
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Switch style={{ marginRight: 12 }} />
                      </CFormItemSwitch>
                      <NameText left="20px">
                        Thông tin bắt buộc khi thêm nhật ký
                      </NameText>
                    </Space>
                  </DivRow>
                </WrapperCard>
              ))}
            </>
          )}
        </Form.List>
        <DivRow>
          <span style={{ color: 'red', marginRight: '6px' }}>
            (*) Thông tin bắt buộc
          </span>
        </DivRow>
      </Form>
    </>
  );
}

StageStep.propTypes = {
  stepID: PropTypes.string,
  form: PropTypes.any,
};

export default StageStep;
