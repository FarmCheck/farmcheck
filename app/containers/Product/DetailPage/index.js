import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Steps, Button, Form, Space } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getQueryString } from 'commons/functionUtils';
import { useQueryParam } from 'hooks';
import { parseUtils } from 'commons/parseUtils';
import { Space as Spacing, PageTitleBar, Notification } from 'components';

import { findOne, update } from 'containers/Product/productSlice';
import { productBase } from 'containers/Product/commons/query';
import CertificationAbleDetailPage from 'containers/CertificationAble/DetailPage';

import InformationStep from './informationStep';
import PriceStep from './priceStep';
import BrandStep from './brandStep';

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

const ExitButton = styled(Button)`
  height: 50px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
`;

const CButton = styled(Button)`
  width: auto;
  border-radius: 6px;
  height: 50px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
`;

const option = { isVisible: true, whiteList: ['tab'] };

export function ProductDetailPage({ match }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { search } = useLocation();
  const tab = getQueryString({
    search,
    field: 'tab',
    defaultValue: '0',
    whiteList: ['0', '1', '2', '3'],
  });

  const [currentTab, setCurrentTab] = useState(Number(tab));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initSubCategoryID, setInitSubCategoryID] = useState('');
  const [certificationAbleList, setCertificationAbleList] = useState([]);
  const [bodyUpdate, setBodyUpdate] = useState({});

  const [query, setQuery] = useState({
    tab,
  });

  useQueryParam(query, option);

  const handleChangeTab = key => {
    setCurrentTab(key);
    setQuery({ ...query, tab: key.toString() });
  };

  const initData = async () => {
    try {
      const actionResult = await dispatch(
        findOne({ id: match.params.id, option: productBase }),
      );
      const { data } = unwrapResult(actionResult);

      setCertificationAbleList(data.certificationAbles);

      setInitSubCategoryID(data.subCategoryID);

      const medias = data.medias.map(e => ({ uid: e.id, url: e.urlThumbnail }));

      form.setFieldsValue({
        ...data,
        unit: data.unit.toString(),
        durationType: data.unit.toString(),
        medias,
      });
    } catch (err) {
      Notification('error', 'T???i d??? li???u th???t b???i', err.message);
    }
  };

  const handleSubmitBodyUpdate = current => {
    if (Object.keys(bodyUpdate).length === 0) {
      handleChangeTab(current + 1);
      return;
    }

    form.validateFields().then(async () => {
      const location = form.getFieldsValue([
        'address',
        'longitude',
        'latitude',
      ]);
      Notification('info', '??ang c???p nh???t t???o s???n lo???i s???n ph???m');

      try {
        setIsSubmitting(true);
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

        Object.keys(body).forEach(e => {
          if (body[e] === undefined) {
            delete body[e];
          }
        });

        const actionResult = await dispatch(
          update({ id: match.params.id, body }),
        );
        unwrapResult(actionResult);

        Notification('success', 'C???p nh???t lo???i s???n ph???m th??nh c??ng');

        setBodyUpdate({});
        setIsSubmitting(false);

        handleChangeTab(current + 1);
      } catch (error) {
        setIsSubmitting(false);
        handleChangeTab(current + 1);
        Notification('error', 'C???p nh???t lo???i s???n ph???m th???t b???i', error.message);
      }
    });
  };

  const handleSetBodyUpdate = value => {
    setBodyUpdate({ ...bodyUpdate, ...value });
  };

  const handleUpdateProductComplete = () => {
    history.push('/product/list');
  };

  const handlePrev = () => {
    if (currentTab > 0) {
      handleChangeTab(currentTab - 1);
    }
    if (currentTab === 0) {
      history.push('/product/list');
    }
  };

  const handleNext = () => {
    switch (currentTab) {
      case 0:
        return handleSubmitBodyUpdate(0);
      case 1:
        return handleSubmitBodyUpdate(1);
      case 2:
        return handleSubmitBodyUpdate(2);
      default:
        return handleUpdateProductComplete();
    }
  };

  const renderNextButton = current => {
    switch (current) {
      case 3:
        return (
          <CButton type="primary" size="large" onClick={handleNext}>
            Ho??n th??nh
          </CButton>
        );
      default:
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
  };

  const listStep = [
    <InformationStep
      form={form}
      onSetBodyUpdate={handleSetBodyUpdate}
      initSubCategoryID={initSubCategoryID}
    />,
    <PriceStep form={form} onSetBodyUpdate={handleSetBodyUpdate} />,
    <BrandStep form={form} onSetBodyUpdate={handleSetBodyUpdate} />,
    <CertificationAbleDetailPage
      targetType="product"
      targetID={match.params.id}
      certificationAbleList={certificationAbleList}
      setCertificationAbleList={setCertificationAbleList}
    />,
  ];

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <PageTitleBar
        title="Ch???nh s???a lo???i s???n ph???m"
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
            <Step
              onClick={() => handleChangeTab(0)}
              title={<TextStep>Th??ng tin lo???i s???n ph???m</TextStep>}
            />
            <Step
              onClick={() => handleChangeTab(1)}
              title={<TextStep>Gi?? b??n v?? h???n s??? d???ng</TextStep>}
            />
            <Step
              onClick={() => handleChangeTab(2)}
              title={<TextStep>Nh??n hi???u</TextStep>}
            />
            <Step
              onClick={() => handleChangeTab(3)}
              title={<TextStep>Ch???ng nh???n</TextStep>}
            />
          </Steps>
        </RowDiv>
        {listStep[currentTab]}
      </WrapperContent>
      <WrapperFooter>
        <CSpace>
          {currentTab !== 0 ? (
            <ExitButton type="text" size="large" onClick={handlePrev}>
              Quay l???i
            </ExitButton>
          ) : (
            <ExitButton type="text" size="large" onClick={handlePrev}>
              H???y ch???nh s???a
            </ExitButton>
          )}
          {renderNextButton(currentTab)}
        </CSpace>
      </WrapperFooter>
    </>
  );
}

ProductDetailPage.propTypes = {
  match: PropTypes.any,
};

export default ProductDetailPage;
