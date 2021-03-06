import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';
import { Steps, Form, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { parseUtils } from 'commons/parseUtils';

import {
  Space as Spacing,
  PageTitleBar,
  Notification,
  CButton,
} from 'components';

import CertificationAbleDetailPage from 'containers/CertificationAble/DetailPage';
import { create, update } from 'containers/Product/productSlice';
import InformationStep from 'containers/Product/CreatePage/informationStep';
import PriceStep from 'containers/Product/CreatePage//priceStep';
import BrandStep from 'containers/Product/CreatePage//brandStep';

const { Step } = Steps;

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  margin-bottom: 84px;
  border-radius: 6px;
  padding: 24px;
`;

const WrapperFooter = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.1);
  background: #fff;
  bottom: 0;
  left: 320px;
`;

const CSpace = styled(Space)`
  position: fixed;
  right: 24px;
  bottom: 15px;
`;

const TextStep = styled.span`
  font-size: ${props => props.theme.fontsizeBase} !important;
  font-weight: 700;
  line-height: 12px !important;
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
];

export function ProductCreatePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const farmID = useSelector(state => state.farm.item.id);

  const [form] = Form.useForm();
  const [currentTab, setCurrentTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatedSuccess, setIsCreatedSuccess] = useState(false);
  const [productID, setProductID] = useState(undefined);
  const [bodyCreate, setBodyCreate] = useState({});
  const [bodyUpdate, setBodyUpdate] = useState({});
  const [item, setItem] = useState({});

  const [certificationAbleList, setCertificationAbleList] = useState([]);

  const handleSubmitBodyCreate = current => {
    form.validateFields().then(async values => {
      const location = form.getFieldsValue([
        'address',
        'longitude',
        'latitude',
      ]);
      if (current === 2) {
        Notification('info', '??ang t???o s???n lo???i s???n ph???m');
        setIsSubmitting(true);

        try {
          const body = {
            ...location,
            ...bodyCreate,
            ...values,
            ...{ farmID },
          };

          parseUtils(body, 'medias', 'images');
          parseUtils(body, 'unit', 'number');
          parseUtils(body, 'durationType', 'number');
          parseUtils(body, 'banner', 'image');

          Object.keys(body).forEach(e => {
            if (body[e] === undefined) {
              delete body[e];
            }
          });

          setIsSubmitting(true);
          const actionResult = await dispatch(create(body));
          const { data } = unwrapResult(actionResult);

          Notification('success', 'T???o lo???i s???n ph???m th??nh c??ng');

          setIsSubmitting(false);

          setIsCreatedSuccess(true);
          setProductID(data.id);

          setCurrentTab(current + 1);
        } catch (error) {
          setIsSubmitting(false);

          Notification('error', 'T???o lo???i s???n ph???m th???t b???i', error.message);
        }
      } else {
        setBodyCreate({ ...bodyCreate, ...values });
        setCurrentTab(current + 1);
      }
    });
  };

  const handleSubmitBodyUpdate = current => {
    if (Object.keys(bodyUpdate).length === 0) {
      setCurrentTab(current + 1);
      return;
    }

    form.validateFields().then(async () => {
      const location = form.getFieldsValue([
        'address',
        'longitude',
        'latitude',
      ]);
      Notification('info', 'C???p nh???t t???o s???n lo???i s???n ph???m');
      setIsSubmitting(true);

      try {
        let body;

        if (current === 2) {
          body = {
            ...location,
            ...bodyUpdate,
          };
        } else {
          body = bodyUpdate;
        }

        parseUtils(body, 'unit', 'number');
        parseUtils(body, 'durationType', 'number');
        parseUtils(body, 'banner', 'image');

        // if (body.medias) {
        //   body.medias = body.medias.map(file => ({
        //     type: 0,
        //     url: file.response && file.response.msg[0].url[0],
        //     urlThumbnail: file.response && file.response.msg[0].url[0],
        //   }));
        // }

        Object.keys(body).forEach(e => {
          if (body[e] === undefined) {
            delete body[e];
          }
        });

        setIsSubmitting(true);
        const actionResult = await dispatch(update({ id: productID, body }));
        const { data } = unwrapResult(actionResult);

        Notification('success', 'C???p nh???t lo???i s???n ph???m th??nh c??ng');

        setBodyUpdate({});
        setIsSubmitting(false);

        setProductID(data.id);
        setCurrentTab(current + 1);
      } catch (error) {
        setIsSubmitting(false);
        setCurrentTab(current + 1);
        Notification('error', 'C???p nh???t lo???i s???n ph???m th???t b???i', error.message);
      }
    });
  };

  const handleSetBodyUpdate = value => {
    setItem({ ...item, ...value });
    if (isCreatedSuccess) {
      setBodyUpdate({ ...bodyUpdate, ...value });
    }
  };

  const handleCreateProductComplete = () => {
    history.push('/product/list');
  };

  const handlePrev = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
    if (currentTab === 0) {
      history.push('/product/list');
    }
  };

  const handleNext = () => {
    switch (currentTab) {
      case 0:
        if (isCreatedSuccess) {
          return handleSubmitBodyUpdate(0);
        }
        return handleSubmitBodyCreate(0);
      case 1:
        if (isCreatedSuccess) {
          return handleSubmitBodyUpdate(1);
        }
        return handleSubmitBodyCreate(1);
      case 2:
        if (isCreatedSuccess) {
          return handleSubmitBodyUpdate(2);
        }
        return handleSubmitBodyCreate(2);
      default:
        return handleCreateProductComplete();
    }
  };

  const renderNextButton = current => {
    switch (current) {
      case 2:
        if (isCreatedSuccess) {
          if (Object.keys(bodyUpdate).length > 0) {
            return (
              <CButton
                loading={isSubmitting}
                type="primary"
                size="large"
                onClick={handleNext}
              >
                L??u l???i
              </CButton>
            );
          }
          return (
            <CButton
              loading={isSubmitting}
              type="primary"
              size="large"
              onClick={handleNext}
            >
              Ti???p theo
            </CButton>
          );
        }
        return (
          <CButton
            loading={isSubmitting}
            type="primary"
            size="large"
            onClick={handleNext}
          >
            T???o ngay
          </CButton>
        );
      case 3:
        return (
          <CButton type="primary" size="large" onClick={handleNext}>
            Ho??n th??nh
          </CButton>
        );
      default:
        if (isCreatedSuccess && Object.keys(bodyUpdate).length > 0) {
          return (
            <CButton
              loading={isSubmitting}
              type="primary"
              size="large"
              onClick={handleNext}
            >
              L??u l???i
            </CButton>
          );
        }
        return (
          <CButton
            type="primary"
            size="large"
            onClick={handleNext}
            src={item}
            rules={rules}
          >
            Ti???p theo
          </CButton>
        );
    }
  };

  const listStep = [
    <InformationStep form={form} onSetBodyUpdate={handleSetBodyUpdate} />,
    <PriceStep form={form} onSetBodyUpdate={handleSetBodyUpdate} />,
    <BrandStep form={form} onSetBodyUpdate={handleSetBodyUpdate} />,
    <CertificationAbleDetailPage
      targetType="product"
      targetID={productID}
      certificationAbleList={certificationAbleList}
      setCertificationAbleList={setCertificationAbleList}
    />,
  ];

  useEffect(() => {}, []);

  return (
    <>
      <PageTitleBar
        title="Th??m m???i lo???i s???n ph???m"
        description=" V???n FDI ????? v??o b???t ?????ng s???n qu?? I t??ng m???nh nh??? DN n?????c ngo??i tin
              t?????ng v??? kh??? n??ng kh???ng ch??? d???ch c???a Vi???t Nam."
      />
      <WrapperContent>
        <RowDiv style={{ alignItems: 'center' }}>
          <Spacing height={12} />
          <Steps
            labelPlacement="vertical"
            style={{ width: '70%' }}
            current={currentTab}
          >
            <Step title={<TextStep>Th??ng tin lo???i s???n ph???m</TextStep>} />
            <Step title={<TextStep>Gi?? b??n v?? h???n s??? d???ng</TextStep>} />
            <Step title={<TextStep>Nh??n hi???u</TextStep>} />
            <Step title={<TextStep>Ch???ng nh???n</TextStep>} />
          </Steps>
        </RowDiv>
        {listStep[currentTab]}
      </WrapperContent>
      <WrapperFooter>
        <CSpace>
          {currentTab !== 0 ? (
            <CButton type="text" size="large" onClick={handlePrev}>
              Quay l???i
            </CButton>
          ) : (
            <CButton type="text" size="large" onClick={handlePrev}>
              {bodyCreate.id ? 'Tho??t' : 'H???y th??m m???i'}
            </CButton>
          )}
          {renderNextButton(currentTab)}
        </CSpace>
      </WrapperFooter>
    </>
  );
}

export default ProductCreatePage;
