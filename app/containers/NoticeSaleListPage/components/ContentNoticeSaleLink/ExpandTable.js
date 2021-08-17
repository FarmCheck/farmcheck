import React from 'react';
import styled from 'styled-components';
import { Table, Input, Checkbox } from 'antd';

import NormalText from 'components/Text/NormalText';
import Space from 'components/Commons/Space';
import HighlightText from 'components/Text/HighlightText';

const Wrap = styled.div`
  background: rgba(57, 181, 74, 0.02);
  padding: 24px 36px;
`;

const Title = styled.span`
  font-weight: 700;
`;

const CTable = styled(Table)`
  .ant-table {
    background: transparent !important;
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    width: 160px !important;
  }

  .ant-table-thead {
    .ant-table-cell {
      font-size: 12px !important;
    }
  }

  .ant-table-cell {
    background: transparent !important;
  }
`;

const PriceInput = styled(Input)`
  width: 120px;
  height: 42px;
`;

const AmountInput = styled(Input)`
  width: 100px;
  height: 42px;
`;

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    user: {
      picture:
        'https://static.ilike.com.vn/uploads/2020/07/f316d002138af85946ffce19f686c94f.jpg',
      familyName: 'Messi',
    },
    product: {
      name: 'Thanh long nhà trồng',
      url:
        'https://vcdn-kinhdoanh.vnecdn.net/2019/12/19/thanh-long-1576724657-7618-1576725025.jpg',
      term: 124,
    },
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
    user: {
      picture:
        'https://static.ilike.com.vn/uploads/2020/07/f316d002138af85946ffce19f686c94f.jpg',
      familyName: 'Messi',
    },
    product: {
      name: 'Thanh long nhà trồng',
      url:
        'https://vcdn-kinhdoanh.vnecdn.net/2019/12/19/thanh-long-1576724657-7618-1576725025.jpg',
      term: 124,
    },
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
    user: {
      picture:
        'https://static.ilike.com.vn/uploads/2020/07/f316d002138af85946ffce19f686c94f.jpg',
      familyName: 'Messi',
    },
    product: {
      name: 'Thanh long nhà trồng',
      url:
        'https://vcdn-kinhdoanh.vnecdn.net/2019/12/19/thanh-long-1576724657-7618-1576725025.jpg',
      term: 124,
    },
  },
];

const columns = [
  {
    title: 'Giá bán',
    dataIndex: 'code',
    key: 'name',
    render: () => <PriceInput />,
  },
  {
    title: 'Số lượng',
    dataIndex: 'name',
    key: 'name',
    render: () => <AmountInput />,
  },
  {
    title: 'Đơn vị',
    dataIndex: 'time',
    key: 'time',
    render: () => <NormalText>Kilogram</NormalText>,
  },
  {
    title: 'Cửa hàng',
    dataIndex: 'account',
    key: 'account',
    render: () => <HighlightText>Nông trại A</HighlightText>,
  },
  {
    align: 'center',
    title: '',
    key: 'action',
    render: () => <Checkbox>Báo giá mỗi ngày</Checkbox>,
  },
];

const ExpandTable = () => (
  <Wrap>
    <Title>Báo giá sản phẩm</Title>
    <Space height={12} />
    <CTable columns={columns} dataSource={data} />
  </Wrap>
);

export default ExpandTable;
