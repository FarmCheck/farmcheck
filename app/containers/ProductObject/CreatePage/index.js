import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form } from 'antd';

import {
  Space as Spacing,
  PageTitle,
  PageTitleBar,
  CSelect,
  TextEditor,
  CUploadList,
  NameText,
  Footer,
  CFormItem,
  Notification,
  InputText,
} from 'components';

import { parseUtils } from 'commons/parseUtils';

import { useFetch } from 'hooks';

import { find as findProduct } from 'containers/Product/productSlice';
import { find as findProcess } from 'containers/Process/processSlice';
import { find as findArea } from 'containers/Area/areaSlice';
import { create } from 'containers/ProductObject/productObjectSlice';

import { baseObjectTypeList as objectTypeList } from 'containers/ProductObject/commons/data';
import {
  product as productQuery,
  area as areaQuery,
  process as processQuery,
} from 'containers/ProductObject/commons/query';

const { useForm } = Form;

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 84px;
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

export function ProductObjectCreatePage({ productObject }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const farmID = useSelector(state => state.farm.item.id);

  const [form] = useForm();
  const [countImg, setCountImg] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [item, setItem] = useState({});

  const { data: productList } = useFetch({
    selector: state => state.product.list,
    action: findProduct,
    query: { ...productQuery, where: { farmID } },
  });

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

  const handleSubmit = () => {
    form.validateFields().then(async value => {
      const body = {
        ...value,
        type: productObject.type,
      };

      parseUtils(body, 'medias', 'images');
      parseUtils(body, 'objectType', 'number');

      Notification('info', `??ang t???o ${productObject.name}`);
      setIsSubmitting(true);

      try {
        const actionResult = await dispatch(create(body));
        unwrapResult(actionResult);

        Notification('success', `T???o ${productObject.name} th??nh c??ng`);

        setIsSubmitting(false);

        history.push(`/${productObject.path}/list`);
      } catch (error) {
        setIsSubmitting(false);

        Notification('error', `T???o ${productObject.name} th???t b???i`);
      }
    });
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

  const initData = () => {
    if (objectTypeList.length > 0) {
      form.setFieldsValue({ objectType: objectTypeList[0].value });
    }
    if (productList.length > 0) {
      form.setFieldsValue({ productID: productList[0].value });
    }
    if (areaList.length > 0) {
      form.setFieldsValue({ areaID: areaList[0].value });
    }
    if (processList.length > 0) {
      form.setFieldsValue({ processID: processList[0].value });
    }
  };

  useEffect(() => {
    initData();
  }, [productList, areaList, processList]);

  return (
    <>
      <PageTitleBar
        title={`Th??m m???i ${productObject.name}`}
        description=" V???n FDI ????? v??o b???t ?????ng s???n qu?? I t??ng m???nh nh??? DN n?????c ngo??i tin
              t?????ng v??? kh??? n??ng kh???ng ch??? d???ch c???a Vi???t Nam."
      />
      <WrapperContent>
        <WrapperContentTitle>
          <PageTitle
            subTitle={`Th??m m???i ${productObject.name}`}
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
              label={<NameText>T??n ?????i t?????ng</NameText>}
              name="name"
              rules={[
                {
                  required: true,
                  minLength: 5,
                  message: `B???n ch??a nh???p t??n ${productObject.name}`,
                },
              ]}
            >
              <InputText
                placeholder={`Nh???p t??n ${productObject.name}`}
                size="large"
              />
            </CFormItem>

            <CFormItem
              label={<NameText>Lo???i ?????i t?????ng</NameText>}
              name="objectType"
            >
              <CSelect list={objectTypeList} />
            </CFormItem>

            <CFormItem
              label={<NameText>Lo???i s???n ph???m</NameText>}
              name="productID"
            >
              <CSelect list={productList} />
            </CFormItem>

            <CFormItem label={<NameText>V??ng s???n xu???t</NameText>} name="areaID">
              <CSelect list={areaList} />
            </CFormItem>

            <CFormItem label={<NameText>Quy tr??nh</NameText>} name="processID">
              <CSelect list={processList} />
            </CFormItem>

            <CFormItem
              name="description"
              label={<NameText>M?? t??? s???n ph???m</NameText>}
            >
              <TextEditor
                onChange={value => {
                  form.setFieldsValue({ description: value });
                }}
              />
            </CFormItem>

            <PageTitle
              subTitle={`H??nh ???nh ${productObject.name}`}
              description=" V???n FDI ????? v??o b???t ?????ng s???n qu?? I t??ng m???nh nh??? DN n?????c ngo??i tin
              t?????ng v??? kh??? n??ng kh???ng ch??? d???ch c???a Vi???t Nam."
            />

            <CFormItem label={<NameText>H??nh ???nh ?????i t?????ng</NameText>}>
              <CUploadList
                valuePropName="fileList"
                name="medias"
                getValueFromEvent={handleChangeImg}
                count={countImg}
              />
            </CFormItem>
          </Form>
          <Spacing height={50} />
        </WrapperContentTitle>
      </WrapperContent>
      <Footer
        content={['H???y th??m m???i', 'L??u l???i']}
        urlExit="/field-plant"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        src={item}
        rules={rules}
      />
    </>
  );
}

ProductObjectCreatePage.propTypes = {
  productObject: PropTypes.object,
};

export default ProductObjectCreatePage;
