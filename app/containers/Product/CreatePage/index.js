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
        Notification('info', 'Đang tạo sản loại sản phẩm');
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

          Notification('success', 'Tạo loại sản phẩm thành công');

          setIsSubmitting(false);

          setIsCreatedSuccess(true);
          setProductID(data.id);

          setCurrentTab(current + 1);
        } catch (error) {
          setIsSubmitting(false);

          Notification('error', 'Tạo loại sản phẩm thất bại', error.message);
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
      Notification('info', 'Cập nhật tạo sản loại sản phẩm');
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

        Notification('success', 'Cập nhật loại sản phẩm thành công');

        setBodyUpdate({});
        setIsSubmitting(false);

        setProductID(data.id);
        setCurrentTab(current + 1);
      } catch (error) {
        setIsSubmitting(false);
        setCurrentTab(current + 1);
        Notification('error', 'Cập nhật loại sản phẩm thất bại', error.message);
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
                Lưu lại
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
              Tiếp theo
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
            Tạo ngay
          </CButton>
        );
      case 3:
        return (
          <CButton type="primary" size="large" onClick={handleNext}>
            Hoàn thành
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
              Lưu lại
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
            Tiếp theo
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
        title="Thêm mới loại sản phẩm"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <WrapperContent>
        <RowDiv style={{ alignItems: 'center' }}>
          <Spacing height={12} />
          <Steps
            labelPlacement="vertical"
            style={{ width: '70%' }}
            current={currentTab}
          >
            <Step title={<TextStep>Thông tin loại sản phẩm</TextStep>} />
            <Step title={<TextStep>Giá bán và hạn sử dụng</TextStep>} />
            <Step title={<TextStep>Nhãn hiệu</TextStep>} />
            <Step title={<TextStep>Chứng nhận</TextStep>} />
          </Steps>
        </RowDiv>
        {listStep[currentTab]}
      </WrapperContent>
      <WrapperFooter>
        <CSpace>
          {currentTab !== 0 ? (
            <CButton type="text" size="large" onClick={handlePrev}>
              Quay lại
            </CButton>
          ) : (
            <CButton type="text" size="large" onClick={handlePrev}>
              {bodyCreate.id ? 'Thoát' : 'Hủy thêm mới'}
            </CButton>
          )}
          {renderNextButton(currentTab)}
        </CSpace>
      </WrapperFooter>
    </>
  );
}

export default ProductCreatePage;
