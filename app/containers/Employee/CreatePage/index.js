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
        Notification('info', '??ang t???o nh??n vi??n');
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

        Notification('success', 'T???o nh??n vi??n th??nh c??ng');
        history.push('/employee/list');
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        Notification('error', 'T???o nh??n vi??n th???t b???i', error);
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
        title="Th??m m???i nh??n vi??n"
        description=" V???n FDI ????? v??o b???t ?????ng s???n qu?? I t??ng m???nh nh??? DN n?????c ngo??i tin
          t?????ng v??? kh??? n??ng kh???ng ch??? d???ch c???a Vi???t Nam."
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
              subTitle="Th??ng tin nh??n vi??n"
              description=" C??c th??ng tin c?? b???n c???a nh??n vi??n."
            />
            <Spacing height={52} />
            <CFormItem
              name="name"
              label={<NameText>T??n nh??n vi??n</NameText>}
              rules={[
                {
                  required: true,
                  message: 'B???n ch??a nh???p t??n nh??n vi??n',
                },
              ]}
            >
              <InputText size="large" />
            </CFormItem>
            <CFormItem
              name="phoneNumber"
              label={<NameText>S??? ??i???n tho???i</NameText>}
              rules={[
                {
                  required: true,
                  message: 'B???n ch??a nh???p s??? ??i???n tho???i',
                },
              ]}
              help={
                isPhoneNumber ? null : (
                  <span style={{ color: 'red' }}>
                    S??? ??i???n tho???i kh??ng h???p l??? !
                  </span>
                )
              }
            >
              <InputText onChange={handleVerifyPhone} size="large" />
            </CFormItem>
            <CFormItem label={<NameText>M???t kh???u</NameText>}>
              <InputText disabled size="large" />
            </CFormItem>
            <CFormItem
              name="role"
              label={<NameText>Ch???c v???</NameText>}
              initialValue="0"
            >
              <CSelect
                list={employeeRoleList}
                placeHolder="Ch???n ch???c v??? nh??n vi??n"
              />
            </CFormItem>
            <Spacing height={24} />
            <RowDiv>
              <TitleText>Th??ng tin ph???</TitleText>
              <Spacing height={12} />
              <NormalText>
                Bao g???m v??ng s???n xu???t qu???n l?? v?? ch???c v??? c???a nh??n vi??n
              </NormalText>
            </RowDiv>
            <Spacing height={12} />
            <Space>
              <Switch
                checked={isManagerArea}
                onChange={() => setIsManagerArea(!isManagerArea)}
                style={{ marginRight: '12px' }}
              />
              <NameText>Thi???t l???p nh??n vi??n qu???n l??</NameText>
            </Space>
            <Spacing height={36} />
            <CFormItem
              name="areaID"
              label={<NameText>V??ng s???n xu???t ph??? tr??ch</NameText>}
            >
              <CSelect
                disabled={!isManagerArea}
                list={areaList}
                placeHolder="Ch???n v??ng s???n xu???t ph??? tr??ch"
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
              subTitle="H??nh ???nh"
              description="???nh ?????i di???n c???a nh??n vi??n."
            />

            <CFormItem
              name="avatar"
              label={<NameText>???nh ?????i di???n</NameText>}
              rules={[
                {
                  required: true,
                  message: 'B???n ch??a th??m ???nh ?????i di???n',
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
        content={['H???y th??m m???i', 'L??u l???i']}
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
