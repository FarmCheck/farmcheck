import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';

import { useFetch } from 'hooks';

import { find as findArea } from 'containers/Area/areaSlice';
import { find as findProcess } from 'containers/Process/processSlice';
import { create } from 'containers/ProductObject/sectionSlice';

import {
  area as areaQuery,
  process as processQuery,
} from 'containers/ProductObject/commons/query';

import {
  PageTitle,
  PageTitleBar,
  Footer,
  NameText,
  CFormItem,
  InputText,
  CSelect,
  CDatePicker,
  Notification,
} from 'components';

const { useForm } = Form;

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 6px;
  padding: 24px;
`;

const WrapperContentTitle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const rules = [
  {
    field: 'name',
    conditions: [
      { name: 'required', value: true },
      { name: 'minLength', value: 5 },
    ],
  },
];

function SectionCreatePage({ match, productObject }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const farmID = useSelector(state => state.farm.item.id);

  const { data: areaList } = useFetch({
    selector: state => state.area.list,
    action: findArea,
    query: { ...areaQuery, where: { farmID } },
  });

  const { data: processList } = useFetch({
    selector: state => state.process.list,
    action: findProcess,
    query: { ...processQuery, where: { farmID } },
  });

  const [form] = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [item, setItem] = useState({});

  const handleSubmit = () => {
    form.validateFields().then(async value => {
      const body = {
        ...value,
        type: productObject.type,
        productObjectID: match.params.id,
      };

      Notification('info', `Đang tạo ${productObject.sectionName}`);
      setIsSubmitting(true);

      try {
        const actionResult = await dispatch(create(body));
        unwrapResult(actionResult);

        Notification('success', `Tạo ${productObject.sectionName} thành công`);

        setIsSubmitting(false);

        history.push(`/${productObject.path}/${match.params.id}/detail?tab=2`);
      } catch (error) {
        setIsSubmitting(false);

        Notification('error', `Tạo ${productObject.sectionName} thất bại`);
      }
    });
  };

  const initData = () => {
    if (areaList.length > 0) {
      form.setFieldsValue({ areaID: areaList[0].id });
    }
    if (processList.length > 0) {
      form.setFieldsValue({ processID: processList[0].id });
    }
    if (!form.getFieldValue('createdAt')) {
      form.setFieldsValue({ createdAt: moment() });
    }
  };

  React.useEffect(() => {
    initData();
  }, [areaList, processList]);

  return (
    <>
      <PageTitleBar
        title={`Thêm mới ${productObject.sectionName}`}
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <WrapperContent>
        <WrapperContentTitle>
          <PageTitle
            subTitle={`Thêm mới ${productObject.sectionName}`}
            description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
          />
          <Form
            style={{ marginTop: '20px' }}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 11 }}
            layout="horizontal"
            labelAlign="left"
            form={form}
            onValuesChange={e => {
              setItem({ ...item, ...e });
            }}
          >
            <CFormItem
              label={<NameText>Tên mùa vụ</NameText>}
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Bạn chưa nhập tên mùa vụ',
                },
              ]}
            >
              <InputText placeholder="Nhập tên mùa vụ" size="large" />
            </CFormItem>
            <CFormItem name="areaID" label={<NameText>Vùng sản xuất</NameText>}>
              <CSelect list={areaList} />
            </CFormItem>
            <CFormItem name="processID" label={<NameText>Quy trình</NameText>}>
              <CSelect list={processList} />
            </CFormItem>
            <CFormItem
              name="createdAt"
              label={<NameText>Ngày bắt đầu</NameText>}
            >
              <CDatePicker
                showTime
                format="MM/DD/YYYY"
                size="large"
                style={{ width: '100%' }}
              />
            </CFormItem>
          </Form>
        </WrapperContentTitle>
      </WrapperContent>
      <Footer
        content={['Hủy thêm mới', 'Lưu lại']}
        urlExit="/field-plant/create"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        src={item}
        rules={rules}
      />
    </>
  );
}

SectionCreatePage.propTypes = {
  match: PropTypes.any,
  productObject: PropTypes.object,
};

export default SectionCreatePage;
