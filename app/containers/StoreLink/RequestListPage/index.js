import React from 'react';
import styled from 'styled-components';

import { PageTitleBar } from 'components';
import ContentLinkRequestList from 'containers/StoreLink/components/ContentLinkRequestList';

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: white;
  padding: 24px;
  border-radius: 6px;
`;

const LinkRequestListPage = () => (
  <>
    <PageTitleBar
      title="Yêu cầu liên kết"
      description="Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin tưởng về khả năng khống chế dịch của Việt Nam."
    />
    <WrapperContent>
      <ContentLinkRequestList />
    </WrapperContent>
  </>
);

export default LinkRequestListPage;
