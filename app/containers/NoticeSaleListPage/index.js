import React from 'react';
import styled from 'styled-components';

import { PageTitleBar } from 'components';
import ContentNoticeSaleLink from 'containers/NoticeSaleListPage/components/ContentNoticeSaleLink';

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: white;
  padding: 24px;
  border-radius: 6px;
`;

const NoticeSaleListPage = () => (
  <>
    <PageTitleBar
      title="Báo giá sản phẩm"
      description="Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin tưởng về khả năng khống chế dịch của Việt Nam."
    />
    <WrapperContent>
      <ContentNoticeSaleLink />
    </WrapperContent>
  </>
);

export default NoticeSaleListPage;
