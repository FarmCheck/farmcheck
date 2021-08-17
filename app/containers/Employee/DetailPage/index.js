import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, Space, Switch } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { parseUtils } from 'commons/parseUtils';
import { isVietnamesePhoneNumber } from 'commons/functionUtils';

import {
  PageTitle,
  PageTitleBar,
  CUploadSingle,
  CSelect,
  InputText,
  NameText,
  CFormItem,
  TitleText,
  NormalText,
  Space as Spacing,
  Footer,
  Notification,
} from 'components';

import { find as findArea } from 'containers/Area/areaSlice';
import { area as areaQuery } from 'containers/Employee/commons/query';
import { findOne, update } from 'containers/Employee/employeeSlice';
import { employeeRoleList } from 'containers/Employee/commons/data';

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 84px;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 18px 0px;
`;

const rules = [
  {
    field: 'any',
    conditions: [{ name: 'required', value: true }],
  },
];

export function EmployeeDetailPage({ match }) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const areaList = useSelector(state => state.area.list);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const [isManagerArea, setIsManagerArea] = useState(false);

  const [bodyUpdate, setBodyUpdate] = useState({});
  const [avatar, setAvatar] = useState('');

  const handleSetBodyUpdate = value => {
    setBodyUpdate({ ...bodyUpdate, ...value });
  };

  const handleSubmit = () => {
    if (Object.keys(bodyUpdate).length === 0) {
      Notification('info', 'Chưa có thay đổi nào');
      return;
    }

    Notification('info', 'Đang cập nhật vùng sản xuất');

    form.validateFields().then(async () => {
      try {
        setIsSubmitting(true);

        const body = {
          ...bodyUpdate,
        };

        parseUtils(body, 'avatar', 'image');
        parseUtils(body, 'role', 'number');

        Object.keys(body).forEach(e => {
          if (body[e] === undefined) {
            delete body[e];
          }
        });

        const actionResult = await dispatch(
          update({ id: match.params.id, body }),
        );

        unwrapResult(actionResult);

        Notification('success', 'Cập nhật nhân viên thành công');
        setBodyUpdate({});
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        Notification('error', 'Cập nhật nhân viên thất bại', error.message);
      }
    });
  };

  const handleVerifyPhone = e => {
    setIsPhoneNumber(isVietnamesePhoneNumber(e.target.value));
  };

  const handleChangeImg = e => e && e.file;

  const initData = async () => {
    try {
      const actionResult = await dispatch(findOne({ id: match.params.id }));
      const { data } = unwrapResult(actionResult);

      parseUtils(data, 'role', 'string');

      form.setFieldsValue({
        ...data,
      });
      setAvatar(data.avatar);
    } catch (error) {
      Notification('error', 'Tải dữ liệu thất bại', error.message);
    }
  };

  const initAreaData = () => {
    if (areaList.length === 0) {
      dispatch(findArea(areaQuery));
    } else {
      form.setFieldsValue({ areaID: areaList[0].id });
    }
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    initAreaData();
  }, [areaList]);

  return (
    <>
      <PageTitleBar
        title="Chỉnh sửa nhân viên"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
          tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <WrapperContent>
        <Wrapper>
          <Form
            form={form}
            onValuesChange={handleSetBodyUpdate}
            style={{ width: '60%' }}
            layout="horizontal"
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
          >
            <PageTitle
              subTitle="Thông tin nhân viên"
              description=" Các thông tin cơ bản của nhân viên."
            />
            <Spacing height={52} />
            <CFormItem
              name="name"
              label={<NameText>Tên nhân viên</NameText>}
              rules={[
                {
                  required: true,
                  message: 'Bạn chưa nhập tên nhân viên',
                },
              ]}
            >
              <InputText size="large" />
            </CFormItem>
            <CFormItem
              name="phoneNumber"
              label={<NameText>Số điện thoại</NameText>}
              rules={[
                {
                  required: true,
                  message: 'Bạn chưa nhập số điện thoại',
                },
              ]}
              help={
                isPhoneNumber ? null : (
                  <span style={{ color: 'red' }}>
                    Số điện thoại không hợp lệ !
                  </span>
                )
              }
            >
              <InputText onChange={handleVerifyPhone} size="large" />
            </CFormItem>
            <CFormItem label={<NameText>Mật khẩu</NameText>}>
              <InputText disabled size="large" />
            </CFormItem>
            <CFormItem
              name="role"
              label={<NameText>Chức vụ</NameText>}
              initialValue="0"
            >
              <CSelect
                list={employeeRoleList}
                placeHolder="Chọn chức vụ nhân viên"
              />
            </CFormItem>
            <Spacing height={24} />
            <RowDiv>
              <TitleText>Thông tin phụ</TitleText>
              <Spacing height={12} />
              <NormalText>
                Bao gồm vùng sản xuất quản lý và chức vụ của nhân viên
              </NormalText>
            </RowDiv>
            <Spacing height={12} />
            <Space>
              <Switch
                checked={isManagerArea}
                onChange={() => setIsManagerArea(!isManagerArea)}
                style={{ marginRight: '12px' }}
              />
              <NameText>Thiết lập nhân viên quản lý</NameText>
            </Space>
            <Spacing height={36} />
            <CFormItem
              name="areaID"
              label={<NameText>Vùng sản xuất phụ trách</NameText>}
            >
              <CSelect
                disabled={!isManagerArea}
                list={areaList}
                placeHolder="Chọn vùng sản xuất phụ trách"
              />
            </CFormItem>
          </Form>

          <Form
            form={form}
            onValuesChange={handleSetBodyUpdate}
            style={{ width: '35%' }}
            layout="vertical"
            labelAlign="left"
          >
            <PageTitle
              subTitle="Hình ảnh"
              description="Ảnh đại diện của nhân viên."
            />

            <CFormItem
              name="avatar"
              label={<NameText>Ảnh đại diện</NameText>}
              rules={[
                {
                  required: true,
                  message: 'Bạn chưa thêm ảnh đại diện',
                },
              ]}
            >
              <CUploadSingle
                valuePropName="file"
                name="avatar"
                width="300px"
                height="300px"
                getValueFromEvent={handleChangeImg}
                initUrl={avatar}
              />
            </CFormItem>
          </Form>
        </Wrapper>
      </WrapperContent>
      <Footer
        content={['Hủy chỉnh sửa', 'Lưu lại']}
        onSubmit={handleSubmit}
        urlExit="/employee/list"
        isSubmitting={isSubmitting}
        src={bodyUpdate}
        rules={rules}
      />
    </>
  );
}

EmployeeDetailPage.propTypes = {
  match: PropTypes.object,
};

export default EmployeeDetailPage;
