import React from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';

import TitleText from 'components/Text/TitleText';
import Row from 'components/Commons/Row';
import Space from 'components/Commons/Space';
import NormalText from 'components/Text/NormalText';
import SearchTable from 'components/Table/SearchTable';
import FilterTable from 'components/Table/FilterTable';

import AllProductTable from './AllProductTable';

const { TabPane } = Tabs;

const Wrap = styled.div``;

const ContentNoticeSaleList = () => (
  <Wrap>
    <TitleText>Danh sách sản phẩm</TitleText>
    <Space height={24} />
    <Tabs defaultActiveKey="1">
      <TabPane tab="Tất cả sản phẩm" key="1">
        <Space height={24} />
        <Row justifyContent="space-between" alignItems="center">
          <Row alignItems="center">
            <FilterTable />
            <Space width={12} />
            <NormalText>(5 trong 23 vùng sản xuất) </NormalText>
          </Row>
          <SearchTable placeholder="Tìm kiếm cửa hàng" />
        </Row>
        <Space height={24} />
        <AllProductTable />
      </TabPane>
      <TabPane tab="Sản phẩm đang báo hàng" key="2">
        <Space height={24} />
        <Row justifyContent="space-between" alignItems="center">
          <Row alignItems="center">
            <FilterTable />
            <Space width={12} />
            <NormalText>(5 trong 23 vùng sản xuất) </NormalText>
          </Row>
          <SearchTable placeholder="Tìm kiếm cửa hàng" />
        </Row>
        <Space height={24} />
        <AllProductTable />
      </TabPane>
    </Tabs>
  </Wrap>
);

export default ContentNoticeSaleList;
