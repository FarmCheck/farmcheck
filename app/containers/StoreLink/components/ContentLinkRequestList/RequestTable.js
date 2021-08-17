import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'antd';

import Row from 'components/Commons/Row';
import Space from 'components/Commons/Space';
import NormalText from 'components/Text/NormalText';
import NameText from 'components/Text/NameText';

import ModalReviewMail from './ModalReviewMail';

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border: 2px solid #f1f1f1;
  box-sizing: border-box;
  border-radius: 50%;
`;

const CTable = styled(Table)`
  .ant-table-container table > thead > tr:first-child th:last-child {
    width: 120px;
  }
`;

const CButtonLink = styled(Button)`
  padding: 12px 0px;
  font-weight: 500;

  span {
    color: ${props => props.color};
  }

  &:hover {
    span {
      text-decoration: underline;
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

const RequestTable = () => {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

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
      align: 'center',
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Row>
          <CButtonLink type="link" color="#4276FE" onClick={openModal}>
            Xem thư ngỏ
          </CButtonLink>
          <Space width={24} />
          <CButtonLink type="link" color="#39B54A">
            Chấp nhận
          </CButtonLink>
          <Space width={24} />
          <CButtonLink type="link" color="#F05540">
            Từ chối
          </CButtonLink>
        </Row>
      ),
    },
  ];

  return (
    <>
      <CTable columns={columns} dataSource={data} />
      <ModalReviewMail visible={visible} closeModal={closeModal} />
    </>
  );
};

export default RequestTable;
