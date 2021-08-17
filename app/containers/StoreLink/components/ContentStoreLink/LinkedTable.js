import React from 'react';
import styled from 'styled-components';
import { Table, Dropdown, Menu, Badge } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import Row from 'components/Commons/Row';
import Space from 'components/Commons/Space';
import NormalText from 'components/Text/NormalText';
import ActionButton from 'components/Button/ActionButton';
import NameText from 'components/Text/NameText';

const CMenuItem = styled(Menu.Item)`
  padding: 12px 24px !important;
  font-weight: 500 !important;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border: 2px solid #f1f1f1;
  box-sizing: border-box;
  border-radius: 50%;
`;

const CBadge = styled(Badge)`
  .ant-badge-status-processing {
    background-color: ${props => props.theme.primaryColor};
  }
  .ant-badge-status-dot {
    width: 12px;
    height: 12px;
  }
`;

const CTable = styled(Table)`
  .ant-table-container table > thead > tr:first-child th:last-child {
    width: 120px;
  }
`;

const menu = (
  <Menu>
    <CMenuItem key="1">Xem cửa hàng</CMenuItem>
    <CMenuItem key="2">Hủy liên kết</CMenuItem>
  </Menu>
);

const menu1 = (
  <Menu>
    <CMenuItem key="1">Bình thường</CMenuItem>
    <CMenuItem key="2">Thân thiết</CMenuItem>
  </Menu>
);

const columns = [
  {
    title: 'Mã cửa hàng',
    dataIndex: 'code',
    key: 'name',
    render: () => <NormalText>1090</NormalText>,
  },
  {
    title: 'Tên cửa hàng',
    dataIndex: 'name',
    key: 'name',
    render: () => (
      <Row alignItems="center">
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Space width={12} />
        <NameText>Nguyễn Văn A</NameText>
      </Row>
    ),
  },
  {
    title: 'Ngày liên kết',
    dataIndex: 'time',
    key: 'time',
    render: () => <NormalText> 10-10-2020</NormalText>,
  },
  {
    title: 'Số sản phẩm',
    dataIndex: 'account',
    key: 'account',
    render: () => <NormalText>2</NormalText>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'position',
    key: 'position',
    render: () => (
      <Dropdown trigger={['click']} overlay={menu1} placement="bottomRight">
        <Row alignItems="center" style={{ cursor: 'pointer' }}>
          <CBadge
            status="processing"
            text={<NormalText>Thân thiết</NormalText>}
          />
          <Space width={12} />
          <CaretDownOutlined />
        </Row>
      </Dropdown>
    ),
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

const LinkedTabel = () => <CTable columns={columns} dataSource={data} />;

export default LinkedTabel;
