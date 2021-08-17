import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Space, Switch } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

import {
  find as findArea,
  update as updateArea,
} from 'containers/Area/areaSlice';
import { area as areaQuery } from 'containers/Employee/commons/query';
import { create } from 'containers/Employee/employeeSlice';
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
    field: 'name',
    conditions: [
      { name: 'required', value: true },
      { name: 'minLength', value: 5 },
    ],
  },
  {
    field: 'phoneNumber',
    conditions: [
      { name: 'required', value: true },
      { name: 'minLength', value: 10 },
    ],
  },
  {
    field: 'avatar',
    conditions: [{ name: 'required', value: true }],
  },
];

export function EmployeeCreatePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();

  const farmID = useSelector(state => state.farm.item.id);
  const areaList = useSelector(state => state.area.list);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const [isManagerArea, setIsManagerArea] = useState(false);
  const [item, setItem] = useState({});

  const handleSubmit = () => {
    form.validateFields().then(async values => {
      const body = {
        ...values,
        farmID,
      };

      parseUtils(body, 'role', 'number');
      parseUtils(body, 'avatar', 'image');

      const { areaID } = body;
      delete body.areaID;

      Object.keys(body).forEach(e => {
        if (body[e] === undefined) {
          delete body[e];
        }
      });

      try {
        Notification('info', 'Đang tạo nhân viên');
        setIsSubmitting(true);
        const actionResult = await dispatch(create(body));
        const { data } = unwrapResult(actionResult);

        if (isManagerArea) {
          const params = {
            id: areaID,
            body: {
              employeeID: data.id,
            },
          };
          const updateResult = await dispatch(updateArea(params));
          unwrapResult(updateResult);
        }

        Notification('success', 'Tạo nhân viên thành công');
        history.push('/employee/list');
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        Notification('error', 'Tạo nhân viên thất bại', error);
      }
    });
  };

  const handleVerifyPhone = e => {
    setIsPhoneNumber(isVietnamesePhoneNumber(e.target.value));
  };

  const handleChangeImg = e => e && e.file;

  useEffect(() => {
    if (areaList.length === 0) {
      dispatch(findArea(areaQuery));
    } else {
      form.setFieldsValue({ areaID: areaList[0].id });
    }
  }, [areaList]);

  return (
    <>
      <PageTitleBar
        title="Thêm mới nhân viên"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
          tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <WrapperContent>
        <Wrapper>
          <Form
            form={form}
            style={{ width: '60%' }}
            layout="horizontal"
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 18 }}
            onValuesChange={e => {
              setItem({ ...item, ...e });
            }}
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
            style={{ width: '35%' }}
            layout="vertical"
            labelAlign="left"
            onValuesChange={e => {
              setItem({ ...item, ...e });
            }}
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
                initUrl={form.getFieldValue('avatar')}
              />
            </CFormItem>
          </Form>
        </Wrapper>
      </WrapperContent>
      <Footer
        content={['Hủy thêm mới', 'Lưu lại']}
        onSubmit={handleSubmit}
        urlExit="/employee/list"
        isSubmitting={isSubmitting}
        src={item}
        rules={rules}
      />
    </>
  );
}

export default EmployeeCreatePage;
