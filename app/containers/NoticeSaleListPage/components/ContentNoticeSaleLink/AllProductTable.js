import React from 'react';
import styled from 'styled-components';
import { Table, Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import Row from 'components/Commons/Row';
import NormalText from 'components/Text/NormalText';
import HighlightText from 'components/Text/HighlightText';
import PriceText from 'components/Text/PriceText';

import ActionButton from 'components/Button/ActionButton';
import Expandable from './ExpandTable';

const CMenuItem = styled(Menu.Item)`
  padding: 12px 24px !important;
  font-weight: 500 !important;
`;

const CTable = styled(Table)`
  .ant-table-container table > thead > tr:first-child th:last-child {
    width: 120px;
  }

  .ant-table-expanded-row {
    .ant-table-cell {
      background: #fff;
      padding: 18px 0px;
    }
  }
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

const AllProductTable = () => {
  const menu = (
    <Menu>
      <CMenuItem key="1">Xem cửa hàng</CMenuItem>
      <CMenuItem key="2">Gửi yêu cầu</CMenuItem>
      <CMenuItem key="3">Theo dõi</CMenuItem>
    </Menu>
  );

  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'name',
      render: () => <NormalText>1090</NormalText>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: () => (
        <Row alignItems="center">
          <HighlightText>Cà rốt hữu cơ</HighlightText>
        </Row>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'time',
      key: 'time',
      render: () => <NormalText>12/202 kg</NormalText>,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'account',
      key: 'account',
      render: () => <PriceText price="90.000" />,
    },
    {
      align: 'center',
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Dropdown trigger={['click']} overlay={menu} placement="bottomRight">
          <ActionButton>
            Lựa chọn <CaretDownOutlined />
          </ActionButton>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <CTable
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: () => <Expandable />,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
      />
    </>
  );
};

export default AllProductTable;
