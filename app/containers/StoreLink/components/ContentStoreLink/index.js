import React from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';

import TitleText from 'components/Text/TitleText';
import Row from 'components/Commons/Row';
import Space from 'components/Commons/Space';
import NormalText from 'components/Text/NormalText';
import SearchTable from 'components/Table/SearchTable';
import FilterTable from 'components/Table/FilterTable';

import LinkedTabel from './LinkedTable';
import UnlinkedTable from './UnlinkedTable';
import FollowedTable from './FollowedTable';

const { TabPane } = Tabs;

const Wrap = styled.div``;

const ContentStoreLinkList = () => (
  <Wrap>
    <TitleText>Danh sách cửa hàng</TitleText>
    <Space height={24} />
    <Tabs defaultActiveKey="1">
      <TabPane tab="Đã liên kết" key="1">
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
        <LinkedTabel />
      </TabPane>
      <TabPane tab="Chưa liên kết" key="2">
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
        <UnlinkedTable />
      </TabPane>
      <TabPane tab="Đang theo dõi" key="3">
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
        <FollowedTable />
      </TabPane>
    </Tabs>
  </Wrap>
);

export default ContentStoreLinkList;
