import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form, Tabs } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import { parseUtils } from 'commons/parseUtils';
import { getQueryString } from 'commons/functionUtils';

import { PageTitleBar, Notification, Footer } from 'components';
import { useQueryParam } from 'hooks';

import { findOne, update } from 'containers/ProductObject/productObjectSlice';

import InformationStep from 'containers/ProductObject/DetailPage/informationStep';
import SectionStep from 'containers/ProductObject/DetailPage/sectionStep';

import { productObjectBase } from 'containers/ProductObject/commons/query';

const { TabPane } = Tabs;

const { useForm } = Form;

const WrapperConent = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 84px;
`;

const option = { isVisible: true, whiteList: ['tab'] };

const rules = [
  {
    field: 'name',
    conditions: [
      { name: 'required', value: true },
      { name: 'minLength', value: 5 },
    ],
  },
];

function ProductObjectDetailPage({ match, productObject }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const tab = getQueryString({
    search,
    field: 'tab',
    defaultValue: 'info',
    whiteList: ['info', 'sections'],
  });

  const [form] = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bodyUpdate, setBodyUpdate] = useState({});
  const [currentTab, setCurrentTab] = useState(tab);
  const [item, setItem] = useState(undefined);
  const [query, setQuery] = useState({
    tab,
  });

  useQueryParam({ query, option, deps: [query] });

  const handleSelectTab = key => {
    setCurrentTab(key);
    setQuery({ ...query, tab: key });
    form.setFieldsValue(item);
  };

  const handleSubmit = () => {
    form.validateFields().then(async () => {
      const body = {
        ...bodyUpdate,
      };

      parseUtils(body, 'objectType', 'number');

      Notification('info', `??ang c???p nh???t ${productObject.name}`);
      setIsSubmitting(true);

      try {
        const actionResult = await dispatch(
          update({ id: match.params.id, body }),
        );
        unwrapResult(actionResult);

        Notification('success', `C???p nh???t ${productObject.name} th??nh c??ng`);
        setIsSubmitting(false);

        history.push(`/${productObject.path}/list`);
      } catch (error) {
        setIsSubmitting(false);

        Notification('error', `C???p nh???t ${productObject.name} th???t b???i`);
      }
    });
  };

  const handleSetBodyUpdate = value => {
    setBodyUpdate({ ...bodyUpdate, ...value });
  };

  const initData = async () => {
    try {
      const actionResult = await dispatch(
        findOne({ id: match.params.id, option: productObjectBase }),
      );
      const { data } = unwrapResult(actionResult);
      const medias = data.medias.map(e => ({ uid: e.id, url: e.url }));

      const standardItem = {
        ...data,
        medias,
        objectType: data.objectType.toString(),
        barcode: data.product.barcode,
      };

      setItem(standardItem);

      if (tab === 'info') {
        form.setFieldsValue(standardItem);
      }
    } catch (err) {
      Notification('error', 'T???i d??? li???u th???t b???i', err.message);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <PageTitleBar
        title={item && item.name}
        description=" V???n FDI ????? v??o b???t ?????ng s???n qu?? I t??ng m???nh nh??? DN n?????c ngo??i tin
              t?????ng v??? kh??? n??ng kh???ng ch??? d???ch c???a Vi???t Nam."
        url={
          currentTab === 'sections' &&
          `/${productObject.path}/${match.params.id}/section/create`
        }
      />
      <WrapperConent>
        <Tabs onChange={handleSelectTab} activeKey={currentTab}>
          <TabPane tab="Th??ng tin c?? b???n" key="info">
            <InformationStep
              productObject={productObject}
              form={form}
              onSetBodyUpdate={handleSetBodyUpdate}
            />
          </TabPane>
          <TabPane tab="Danh s??ch m??a v???" key="sections">
            <SectionStep productObjectID={match.params.id} />
          </TabPane>
        </Tabs>
      </WrapperConent>
      {currentTab === 'info' && (
        <Footer
          content={['H???y ch???nh s???a', 'L??u l???i']}
          urlExit="/field-plant"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          src={bodyUpdate}
          rules={rules}
        />
      )}
    </>
  );
}

ProductObjectDetailPage.propTypes = {
  match: PropTypes.any,
  productObject: PropTypes.object,
};

export default ProductObjectDetailPage;
