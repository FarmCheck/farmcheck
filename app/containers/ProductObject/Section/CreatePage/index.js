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

      Notification('info', `??ang t???o ${productObject.sectionName}`);
      setIsSubmitting(true);

      try {
        const actionResult = await dispatch(create(body));
        unwrapResult(actionResult);

        Notification('success', `T???o ${productObject.sectionName} th??nh c??ng`);

        setIsSubmitting(false);

        history.push(`/${productObject.path}/${match.params.id}/detail?tab=2`);
      } catch (error) {
        setIsSubmitting(false);

        Notification('error', `T???o ${productObject.sectionName} th???t b???i`);
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
        title={`Th??m m???i ${productObject.sectionName}`}
        description=" V???n FDI ????? v??o b???t ?????ng s???n qu?? I t??ng m???nh nh??? DN n?????c ngo??i tin
              t?????ng v??? kh??? n??ng kh???ng ch??? d???ch c???a Vi???t Nam."
      />
      <WrapperContent>
        <WrapperContentTitle>
          <PageTitle
            subTitle={`Th??m m???i ${productObject.sectionName}`}
            description=" V???n FDI ????? v??o b???t ?????ng s???n qu?? I t??ng m???nh nh??? DN n?????c ngo??i tin
              t?????ng v??? kh??? n??ng kh???ng ch??? d???ch c???a Vi???t Nam."
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
              label={<NameText>T??n m??a v???</NameText>}
              name="name"
              rules={[
                {
                  required: true,
                  message: 'B???n ch??a nh???p t??n m??a v???',
                },
              ]}
            >
              <InputText placeholder="Nh???p t??n m??a v???" size="large" />
            </CFormItem>
            <CFormItem name="areaID" label={<NameText>V??ng s???n xu???t</NameText>}>
              <CSelect list={areaList} />
            </CFormItem>
            <CFormItem name="processID" label={<NameText>Quy tr??nh</NameText>}>
              <CSelect list={processList} />
            </CFormItem>
            <CFormItem
              name="createdAt"
              label={<NameText>Ng??y b???t ?????u</NameText>}
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
        content={['H???y th??m m???i', 'L??u l???i']}
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
