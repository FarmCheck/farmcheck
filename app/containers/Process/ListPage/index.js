import React, { useState, useEffect } from 'react';
import { Table, Space, Form } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { PlusCircleFilled, FilterFilled } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  CSelectFilter,
  NormalText,
  PageTitleBar,
  TitleText,
  NameText,
  OrderTable,
  SearchTable,
  AddItemButton,
  ActionCellTable,
  Space as Spacing,
} from 'components';

import { useFetchDataTable } from 'hooks';
import { findForTableList } from 'containers/Process/processSlice';
import { renderTableSkeleton } from 'commons/renderUtils';

import {
  skeletonList,
  orderList,
  statusList,
  stepList,
  skeletonData,
} from 'containers/Process/commons/data';
import { process as processQueryInit } from 'containers/Process/commons/query';

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 6px;
  padding: 24px;
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
    title: 'Mã quy trình',
    dataIndex: 'code',
    key: 'code',
    render: code => <NormalText>{code}</NormalText>,
  },
  {
    title: 'Tên quy trình',
    dataIndex: 'name',
    key: 'name',
    render: name => <NameText>{name}</NameText>,
  },
  {
    align: 'center',
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => (
      <NormalText>{moment(createdAt).format('DD-MM-YYYY')}</NormalText>
    ),
  },
  {
    align: 'center',
    title: 'Số bước',
    dataIndex: 'quantity',
    key: 'quantity',
    render: quantity => <NormalText>{quantity}</NormalText>,
  },
  {
    align: 'center',
    title: 'Số lượng',
    dataIndex: 'productObjectsTotal',
    key: 'productObjectsTotal',
    render: productObjectsTotal => (
      <NormalText>
        <Space size="middle">
          <Link to="/field-plant/create">
            <AddItemButton
              size="small"
              type="primary"
              icon={
                <PlusCircleFilled
                  className="button-class"
                  style={{ color: '#39B54A' }}
                />
              }
            />
          </Link>
          <NormalText>{productObjectsTotal}</NormalText>
        </Space>
      </NormalText>
    ),
  },
  {
    align: 'center',
    title: 'Thao tác',
    dataIndex: 'id',
    key: 'id',
    render: id => <ActionCellTable id={id} name="process" />,
  },
];

const option = {
  isVisible: true,
  whiteList: ['order', 'take', 'page', 'where'],
};

function ProcessListPage() {
  const farmID = useSelector(state => state.farm.item.id);

  const [form] = Form.useForm();
  const [query, setQuery] = useState({
    ...processQueryInit,
    'where.farmID': farmID,
  });

  const { isLoading, data: processList, pagination } = useFetchDataTable({
    selector: state => state.process.tableList,
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
    if (stepList.length > 0) {
      form.setFieldsValue({ 'where.quantity': 'all' });
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
        title="Quy trình"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
        url="/process/create"
      />
      <WrapperContent>
        <Form onValuesChange={handleFilterFormChange} form={form}>
          <TitleText>Danh sách quy trình</TitleText>
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
              <Form.Item style={{ marginBottom: 0 }} name="where.quantity">
                <CSelectFilter
                  width={220}
                  list={stepList}
                  placeholder="Lọc theo số bước"
                />
              </Form.Item>
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
                  ({processList.length} trong {pagination.total} quy trình)
                </NormalText>
              </Form.Item>
            </Space>
            <Form.Item name="search">
              <SearchTable placeholder="Tìm theo tên quy trình" />
            </Form.Item>
          </WrapperFilter>
        </Form>
        <Table
          onChange={handlePaginationChange}
          pagination={pagination}
          locale={{ emptyText: 'Không tìm thấy sản phẩm' }}
          columns={isLoading ? renderTableSkeleton(skeletonData) : columns}
          dataSource={isLoading ? skeletonList : processList}
        />
      </WrapperContent>
    </>
  );
}

export default ProcessListPage;
