import React from 'react';
import styled from 'styled-components';

import { PageTitleBar } from 'components';
import ContentStoreLinkList from 'containers/StoreLink/components/ContentStoreLink';

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: white;
  padding: 24px;
  border-radius: 6px;
`;

const StoreLinkListPage = () => (
  <>
    <PageTitleBar
      title="Liên kết cửa hàng"
      description="Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin tưởng về khả năng khống chế dịch của Việt Nam."
    />
    <WrapperContent>
      <ContentStoreLinkList />
    </WrapperContent>
  </>
);

export default StoreLinkListPage;
