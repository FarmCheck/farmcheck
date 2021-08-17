import React from 'react';
import styled from 'styled-components';

import TitleText from 'components/Text/TitleText';
import Row from 'components/Commons/Row';
import Space from 'components/Commons/Space';
import NormalText from 'components/Text/NormalText';
import SearchTable from 'components/Table/SearchTable';
import FilterTable from 'components/Table/FilterTable';

import RequestTable from './RequestTable';

const Wrap = styled.div``;

const ContentLinkRequestList = () => (
  <Wrap>
    <TitleText>Danh sách cửa hàng</TitleText>
    <Space height={24} />
    <Space height={24} />
    <Row justifyContent="space-between" alignItems="center">
      <Row alignItems="center">
        <FilterTable />
        <Space width={12} />
        <NormalText>(5 trong 23 yêu cầu) </NormalText>
      </Row>
      <SearchTable placeholder="Tìm kiếm cửa hàng" />
    </Row>
    <Space height={24} />
    <RequestTable />
  </Wrap>
);

export default ContentLinkRequestList;
