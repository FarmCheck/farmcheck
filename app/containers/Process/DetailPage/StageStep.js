import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { unwrapResult } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Switch, Form, Divider, Button, Space } from 'antd';

import {
  NameText,
  InputText,
  CSelect,
  PageTitle,
  Notification,
} from 'components';
import { inputTypes } from 'containers/Process/commons/data';
import { checkIsFullFill } from 'containers/Process/commons/parseUtils';
import {
  createStepProperty,
  updateStepProperty,
  removeStepProperty,
} from 'containers/Process/processSlice';
import { useDispatch } from 'react-redux';

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
  height 60px;
  background-color: #fff5f6;
  color: red;
  border-radius: 6px;
  margin-bottom: 12px;
`;

function StageStep({ form, stepID, isLastStep = false, onSetBodyUpdate }) {
  const dispatch = useDispatch();

  const [properties, setProperties] = useState([]);
  const [focusingItem, setFocusingItem] = useState(0);

  const handleAddNewStepProperty = add => {
    const propsStep = form.getFieldValue(`stepProperties_${stepID}`);

    if (propsStep.length === 0) {
      add();
      return;
    }

    if (propsStep[propsStep.length - 1].id) {
      add();
    } else {
      Notification('warning', 'Chưa hoàn thành trường hiện tại');
    }
  };

  const handleUpdateStepProperty = async (propsStep, order) => {
    if (_.isEqual(propsStep[order], properties[order])) {
      Notification('warning', 'Chưa có thay đổi nào');
      return;
    }

    const params = {
      id: propsStep[order].id,
      body: {
        stepID,
        ...propsStep[order],
        type: Number(propsStep[order].type),
      },
    };
    try {
      const updateResult = await dispatch(updateStepProperty(params));
      unwrapResult(updateResult);
      setProperties(propsStep);

      Notification('info', 'Cập nhật thông tin ghi nhận sản xuất thành công');
    } catch (error) {
      Notification(
        'error',
        'Cập nhật thông tin ghi nhận sản xuất thất bại',
        error.message,
      );
    }
  };

  const handleCreateStepProperty = async (propsStep, order) => {
    const body = {
      stepID,
      ...propsStep[order],
      type: Number(propsStep[order].type),
    };
    try {
      const createResult = await dispatch(createStepProperty(body));

      const { data } = unwrapResult(createResult);

      const newProperties = properties.concat({
        ...data,
        type: data.type.toString(),
      });

      form.setFieldsValue({
        [`stepProperties_${stepID}`]: newProperties,
      });
      setProperties(newProperties);
      Notification('info', 'Tạo thông tin ghi nhận sản xuất thành công');
    } catch (error) {
      Notification(
        'error',
        'Tạo thông tin ghi nhận sản xuất thất bại',
        error.message,
      );
    }
  };

  const handleSubmitStepProperty = async order => {
    const propsStep = form.getFieldValue(`stepProperties_${stepID}`);
    if (!checkIsFullFill(propsStep[propsStep.length - 1])) {
      Notification('warning', 'Chưa hoàn thành trường hiện tại');
      return;
    }

    if (propsStep[order].id) {
      handleUpdateStepProperty(propsStep, order);
      return;
    }

    handleCreateStepProperty(propsStep, order);
  };

  const handleDeleteStepProperty = (order, remove) => {
    const propsStep = form.getFieldValue(`stepProperties_${stepID}`);

    if (!propsStep[order].id) {
      remove(order);
      setProperties(form.getFieldValue(`stepProperties_${stepID}`));
      return;
    }

    try {
      dispatch(removeStepProperty(propsStep[order].id));

      remove(order);
      setProperties(form.getFieldValue(`stepProperties_${stepID}`));
      Notification('info', 'Xóa thông tin ghi nhận sản xuất thành công');
    } catch (error) {
      Notification(
        'error',
        'Xóa thông tin ghi nhận sản xuất thất bại',
        error.message,
      );
    }
  };

  const initProperties = () => {
    const propsStep = form.getFieldValue(`stepProperties_${stepID}`);
    if (propsStep.length > 0 && propsStep[propsStep.length - 1].id) {
      setProperties(form.getFieldValue(`stepProperties_${stepID}`));
    }
  };

  useEffect(() => {
    initProperties();
  }, []);

  return (
    <>
      <PageTitle
        subTitle={isLastStep ? 'Thu hoạch' : 'Thông tin cơ bản'}
        description={
          isLastStep
            ? 'Thông tin thu hoạch'
            : 'Thông tin và thiết lập quy trình cơ bản'
        }
      />
      <Form
        form={form}
        layout="vertical"
        onValuesChange={value => onSetBodyUpdate(value, stepID)}
      >
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
        <Form.List
          initialValue={form.getFieldValue(`stepProperties_${stepID}`)}
          name={`stepProperties_${stepID}`}
        >
          {(fields, { add, remove }) => (
            <>
              <DivRow style={{ justifyContent: 'space-between' }} bottom="24px">
                <NameText>Thông tin ghi nhận khi sản xuất</NameText>
                <Button
                  onClick={() => handleAddNewStepProperty(add)}
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
                        onClick={() => handleDeleteStepProperty(name, remove)}
                      >
                        <span style={{ textDecorationLine: 'underline' }}>
                          Xóa
                        </span>
                      </Button>
                      <Button onClick={() => handleSubmitStepProperty(name)}>
                        Lưu lại
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
  isLastStep: PropTypes.bool,
  form: PropTypes.any,
  onSetBodyUpdate: PropTypes.func,
};

export default StageStep;
