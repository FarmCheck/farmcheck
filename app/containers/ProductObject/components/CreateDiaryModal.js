import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { Modal, Form } from 'antd';

import {
  CButton,
  CDatePicker,
  CUploadList,
  NameText,
  InputText,
  CSelect,
  Notification,
} from 'components';

import { parseUtils } from 'commons/parseUtils';

import { find as findStep } from 'containers/ProductObject/stepSlice';
import { create as createDiary } from 'containers/ProductObject/diarySlice';
import { step as stepQuery } from 'containers/ProductObject/commons/query';

function CreateDiaryModal({ onCancel, item, isVisible }) {
  const dispatch = useDispatch();

  const stepList = useSelector(state => state.step.list);
  const farmID = useSelector(state => state.farm.item.id);

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [stepID, setStepID] = useState('');
  const [countImg, setCountImg] = useState(0);

  const handleSubmit = () => {
    form.validateFields().then(async values => {
      const body = {
        ...values,
        [item.field]: form.getFieldValue(item.field),
      };

      parseUtils(body, 'urls', 'url');

      Notification('info', 'Đang thêm mới nhật ký');
      setIsSubmitting(true);

      try {
        const actionResult = await dispatch(createDiary(body));
        unwrapResult(actionResult);

        setIsSubmitting(false);

        Notification('success', 'Thêm mới nhật ký thành công');

        setCountImg(0);
        form.setFieldsValue({
          name: '',
          description: '',
          createdAt: moment(),
          url: [],
        });
      } catch (error) {
        setIsSubmitting(false);

        Notification('error', 'Thêm mới nhật ký thất bại', error.message);
      }
    });
  };

  const handleCancel = () => {
    cleanUpForm();
    onCancel();
  };

  const handleChangeImg = e => {
    if (Array.isArray(e)) {
      return e;
    }

    const { fileList } = e;
    if (Array.isArray(fileList)) {
      setCountImg(fileList.length);
    }

    return e && e.fileList;
  };

  const cleanUpForm = () => {
    setStepID('');
    setCountImg(0);
    form.resetFields(['createdAt', 'name', 'description', 'urls', 'stepID']);
  };

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const { id, processID, field } = item;

    dispatch(
      findStep({
        ...stepQuery,
        where: { ...stepQuery.where, processID, process: { farmID } },
      }),
    );
    form.setFieldsValue({ [field]: id, createdAt: moment() });
  }, [isVisible]);

  return (
    <Modal
      title={`Thêm mới nhật ký cho ${item && item.name}`}
      visible={isVisible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      footer={[
        <CButton key="0" onClick={handleCancel}>
          Hủy
        </CButton>,
        <CButton
          key="1"
          type="primary"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Xác nhận
        </CButton>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          style={{ width: '100%' }}
          label={<NameText>Chọn bước muốn thêm nhật ký</NameText>}
          name="stepID"
          rules={[
            {
              required: true,
              message: 'Bạn chưa chọn bước trong qui trình',
            },
          ]}
        >
          <CSelect
            onChange={value => {
              setStepID(value);
            }}
            list={stepList}
            placeholder="Chọn bước qui trình"
          />
        </Form.Item>

        {stepID !== '' && (
          <>
            <Form.Item
              style={{ width: '100%' }}
              label={<NameText>Tên nhật ký</NameText>}
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Bạn chưa tên nhật ký',
                },
              ]}
            >
              <InputText placeholder="Bón phân, nhổ cỏ" size="large" />
            </Form.Item>

            <Form.Item
              style={{ width: '100%' }}
              label={<NameText>Mô tả về nhật ký</NameText>}
              name="description"
            >
              <InputText
                placeholder="Mô tả chi tiết về quá trình thực hiện"
                size="large"
              />
            </Form.Item>

            <Form.Item
              style={{ width: '100%' }}
              label={<NameText>Hình ảnh</NameText>}
            >
              <CUploadList
                valuePropName="fileList"
                name="urls"
                getValueFromEvent={handleChangeImg}
                count={countImg}
              />
            </Form.Item>

            <Form.Item
              style={{ width: '100%' }}
              label={<NameText>Thời gian</NameText>}
              name="createdAt"
            >
              <CDatePicker
                showTime
                format="MM/DD/YYYY HH:mm:ss"
                size="large"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}

CreateDiaryModal.propTypes = {
  onCancel: PropTypes.func,
  item: PropTypes.object,
  isVisible: PropTypes.bool,
};

export default CreateDiaryModal;
