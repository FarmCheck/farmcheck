import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useQueryParam } from 'hooks';
import { useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { Tabs, Form, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { parseUtils } from 'commons/parseUtils';
import { env } from 'env';
import {
  Footer,
  Space as Spacing,
  Notification,
  PageTitleBar,
} from 'components';

import { getQueryString } from 'commons/functionUtils';
import { GlobalIcon } from 'public/icons';

import CertificationAbleDetailPage from 'containers/CertificationAble/DetailPage';
import { farmBase } from 'containers/Farm/commons/query';
import { findOne, update } from 'containers/Farm/farmSlice';
import InformationStep from './InformationStep';
import ContactStep from './ContactStep';
import BrandStep from './BrandStep';
import GalleryStep from './GalleryStep';

const { TabPane } = Tabs;

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: white;
  padding: 24px;
  margin-bottom: 84px;
  border-radius: 6px;
`;

const CButton = styled(Button)`
  display: flex !important;
  align-items: center !important;
  height: 50px !important;
  font-weight: 700 !important;
  font-size: 16px !important;
`;

const option = { isVisible: true, whiteList: ['tab'] };

const rules = [
  {
    field: 'any',
    conditions: [{ name: 'required', value: true }],
  },
];

const FarmDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const tab = getQueryString({
    search,
    field: 'tab',
    defaultValue: 'info',
    whiteList: ['info', 'contact', 'brand', 'gallery', 'certification-able'],
  });

  const [form] = Form.useForm();
  const [currentTab, setCurrentTab] = useState(tab);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [certificationAbleList, setCertificationAbleList] = useState([]);
  const [logo, setLogo] = useState('');
  const [bodyUpdate, setBodyUpdate] = useState({});

  const [query, setQuery] = useState({
    tab,
  });

  useQueryParam({ query, option, deps: [query] });

  const handleRedirect = () => {
    const win = window.open(env.farmhub.webApp, '_blank');
    win.focus();
  };

  const RedirectButton = () => (
    <CButton type="primary" onClick={handleRedirect}>
      <GlobalIcon width={18} height={18} />
      <Spacing width={14} />
      <span> Xem trang web</span>
    </CButton>
  );

  const handleChangeTab = key => {
    form.validateFields().then(() => {
      setCurrentTab(key);
      setQuery({ ...query, tab: key });
    });
  };

  const handleSetBodyUpdate = value => {
    setBodyUpdate({ ...bodyUpdate, ...value });
  };

  const handleSubmitBodyUpdate = () => {
    if (Object.keys(bodyUpdate).length === 0) {
      Notification('info', 'Chưa có thay đổi nào');
      return;
    }

    form.validateFields().then(async () => {
      Notification('info', 'Đang cập nhật tạo sản loại sản phẩm');
      setIsSubmitting(true);

      const location = form.getFieldsValue([
        'address',
        'longitude',
        'latitude',
      ]);
      const body = {
        ...location,
        ...bodyUpdate,
      };

      parseUtils(body, 'logo', 'image');
      parseUtils(body, 'banner', 'image');

      Object.keys(body).forEach(e => {
        if (body[e] === undefined) {
          delete body[e];
        }
      });

      try {
        const actionResult = await dispatch(
          update({ id: match.params.id, body }),
        );
        unwrapResult(actionResult);

        setBodyUpdate({});
        setIsSubmitting(false);
        Notification('success', 'Cập nhật nông trại thành công');
      } catch (error) {
        setIsSubmitting(false);
        Notification('error', 'Cập nhật nông trại thất bại', error.message);
      }
    });
  };

  const initData = async () => {
    try {
      const actionResult = await dispatch(
        findOne({ id: match.params.id, option: farmBase }),
      );
      const { data } = unwrapResult(actionResult);

      const medias = data.medias.map(e => ({ uid: e.id, url: e.urlThumbnail }));

      form.setFieldsValue({
        ...data,
        medias,
      });
      setLogo(data.logo);
      setCertificationAbleList(data.certificationAbles);
    } catch (err) {
      Notification('error', 'Tải dữ liệu thất bại', err.message);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <PageTitleBar
        title="Thông tin nông trại"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
        RedirectButton={RedirectButton}
      />
      <WrapperContent>
        <Tabs activeKey={currentTab} onChange={handleChangeTab}>
          <TabPane tab="Thông tin cơ bản" key="info">
            <InformationStep
              form={form}
              logo={logo}
              onSetBodyUpdate={handleSetBodyUpdate}
            />
          </TabPane>
          <TabPane tab="Thông tin liên lạc" key="contact">
            <ContactStep form={form} onSetBodyUpdate={handleSetBodyUpdate} />
          </TabPane>
          <TabPane tab="Thương hiệu" key="brand">
            <BrandStep form={form} onSetBodyUpdate={handleSetBodyUpdate} />
          </TabPane>
          <TabPane tab="Sưu tập hình ảnh" key="gallery">
            <GalleryStep />
          </TabPane>
          <TabPane tab="Chứng nhận" key="certification-able">
            <CertificationAbleDetailPage
              targetType="farm"
              targetID={match.params.id}
              certificationAbleList={certificationAbleList}
              setCertificationAbleList={setCertificationAbleList}
            />
          </TabPane>
        </Tabs>
        <Spacing height={72} />
      </WrapperContent>
      <Footer
        content={['Hủy chỉnh sửa', 'Lưu lại']}
        onSubmit={handleSubmitBodyUpdate}
        urlExit="/"
        isUpdate
        isSubmitting={isSubmitting}
        src={bodyUpdate}
        rules={rules}
      />
    </>
  );
};

FarmDetailPage.propTypes = {
  match: PropTypes.object,
};

export default FarmDetailPage;
