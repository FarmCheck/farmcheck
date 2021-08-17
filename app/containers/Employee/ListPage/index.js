import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Table, Space, Form } from 'antd';
import { FilterFilled } from '@ant-design/icons';

import { useSelector } from 'react-redux';

import { renderTableSkeleton } from 'commons/renderUtils';

import {
  Space as Spacing,
  PageTitleBar,
  CSelectFilter,
  NormalText,
  TitleText,
  NameText,
  SearchTable,
  OrderTable,
  EmployeeRoleCellTable,
  ActionCellTable,
} from 'components';

import { findForTableList } from 'containers/Employee/employeeSlice';
import { useFetchDataTable } from 'hooks';

import {
  skeletonList,
  skeletonData,
  orderList,
  statusList,
} from 'containers/Employee/commons/data';
import { employee as employeeQueryInit } from 'containers/Employee/commons/query';

const DivInfo = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  align-items: center;
`;

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 6px;
  padding: 24px;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border: 2px solid #f1f1f1;
  box-sizing: border-box;
  border-radius: 50%;
`;

const WrapperFilter = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 18px 0px;
`;

const FilterIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 42px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 6px;
`;

const columns = [
  {
    title: 'Mã nhân viên',
    dataIndex: 'code',
    key: 'code',
    render: code => <NormalText>{code}</NormalText>,
  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'infoBox',
    key: 'infoBox',
    render: infoBox => (
      <DivInfo>
        <Avatar src={infoBox.avatar} />
        <Spacing width={12} />
        <NameText>{infoBox.name}</NameText>
      </DivInfo>
    ),
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => (
      <NormalText>{moment(createdAt).format('DD-MM-YYYY')}</NormalText>
    ),
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: phoneNumber => <NormalText>{phoneNumber}</NormalText>,
  },
  {
    title: 'Chức vụ',
    dataIndex: 'role',
    key: 'role',
    render: role => <EmployeeRoleCellTable role={role} />,
  },
  {
    align: 'center',
    title: 'Thao tác',
    dataIndex: 'id',
    key: 'id',
    render: id => <ActionCellTable id={id} name="employee" />,
  },
];

const option = {
  isVisible: true,
  whiteList: ['order', 'take', 'page', 'where'],
};

function EmployeeListPage() {
  const farmID = useSelector(state => state.farm.item.id);

  const [form] = Form.useForm();
  const [query, setQuery] = useState({
    ...employeeQueryInit,
    'where.farmID': farmID,
  });

  const { isLoading, data: employeeList, pagination } = useFetchDataTable({
    selector: state => state.employee.tableList,
    action: findForTableList,
    query,
    option,
    deps: [],
  });

  const handleFilterFormChange = e => {
    if (e.isObject) {
      return;
    }

    const key = Object.keys(e)[0];
    const value = Object.values(e)[0];

    if (value === 'all') {
      delete query[key];
      setQuery({ ...query });
    } else {
      setQuery({ ...query, ...e });
    }
  };

  const handlePaginationChange = e => {
    setQuery({
      ...query,
      page: e.current,
      take: e.pageSize,
    });
  };

  const initData = () => {
    if (statusList.length > 0) {
      form.setFieldsValue({ 'where.status': 'all' });
    }
    if (orderList.length > 0) {
      form.setFieldsValue({ order: query.order });
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <PageTitleBar
        title="Nhân viên"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
          tưởng về khả năng khống chế dịch của Việt Nam."
        url="/employee/create"
      />
      <WrapperContent>
        <Form onValuesChange={handleFilterFormChange} form={form}>
          <TitleText>Danh sách nhân viên</TitleText>
          <Spacing height={12} />
          <WrapperFilter
            style={{
              alignItems: 'center',
              borderBottom: '1px solid #f1f1f1',
            }}
          >
            <Space size="middle">
              <FilterIcon>
                <Space>
                  <FilterFilled style={{ color: '#39B54A', fontSize: 16 }} />
                  <span>Lọc</span>
                </Space>
              </FilterIcon>
              <Form.Item style={{ marginBottom: 0 }} name="where.status">
                <CSelectFilter
                  width={220}
                  list={statusList}
                  placeholder="Lọc theo trạng thái"
                />
              </Form.Item>
            </Space>
          </WrapperFilter>
          <WrapperFilter style={{ justifyContent: 'space-between' }}>
            <Space>
              <Form.Item name="order">
                <OrderTable list={orderList} />
              </Form.Item>
              <Form.Item>
                <NormalText>
                  ({employeeList.length} trong {pagination.total} nhân viên)
                </NormalText>
              </Form.Item>
            </Space>
            <Form.Item name="search">
              <SearchTable placeholder="Tìm theo tên nhân viên" />
            </Form.Item>
          </WrapperFilter>
        </Form>
        <Table
          onChange={handlePaginationChange}
          pagination={pagination}
          columns={isLoading ? renderTableSkeleton(skeletonData) : columns}
          dataSource={isLoading ? skeletonList : employeeList}
        />
      </WrapperContent>
    </>
  );
}

export default EmployeeListPage;
