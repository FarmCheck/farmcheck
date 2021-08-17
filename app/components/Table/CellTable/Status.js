import React from 'react';
import styled from 'styled-components';
import { Badge } from 'antd';

import NormalText from 'components/Text/NormalText';

const CBadge = styled(Badge)`
  .ant-badge-status-processing {
    background-color: ${props => props.theme.primaryColor};
  }
  .ant-badge-status-dot {
    width: 12px;
    height: 12px;
  }
`;

const TableStatus = ({ status }) => {
  switch (status) {
    case 0:
      return (
        <CBadge
          status="processing"
          text={<NormalText>Đang sản xuất</NormalText>}
        />
      );
    case 1:
      return <NormalText>Dừng sản xuất</NormalText>;
    case 2:
      return <NormalText>Tạm dừng sản xuất</NormalText>;
    case 3:
      return <NormalText>Chưa hoàn thành</NormalText>;
    default:
      return '';
  }
};

export default TableStatus;
