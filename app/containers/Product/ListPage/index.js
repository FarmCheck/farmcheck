import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Table, Space, Form } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PlusCircleFilled, FilterFilled } from '@ant-design/icons';

import { renderTableSkeleton } from 'commons/renderUtils';

import {
  InfoCellTable,
  NormalText,
  PageTitleBar,
  TitleText,
  CSelectFilter,
  SearchTable,
  OrderTable,
  AddItemButton,
  StatusCellTable,
  ActionCellTable,
  Space as Spacing,
} from 'components';

import { find as findCategory } from 'containers/HomePage/categorySlice';
import { findForTableList } from 'containers/Product/productSlice';
import { useFetchDataTable, useFetch } from 'hooks';

import {
  skeletonList,
  skeletonData,
  statusList,
  orderList,
} from 'containers/Product/commons/data';
import {
  category as categoryQuery,
  product as productQueryInit,
} from 'containers/Product/commons/query';

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
    title: 'Mã loại',
    dataIndex: 'code',
    key: 'code',
    render: code => <NormalText>{code}</NormalText>,
  },
  {
    title: 'Tên loại sản phẩm',
    width: 200,
    dataIndex: 'infoBox',
    key: 'infoBox',
    render: infoBox => <InfoCellTable name={infoBox.name} img={infoBox.img} />,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'expiredAt',
    key: 'expiredAt',
    render: expiredAt => (
      <NormalText>{moment(expiredAt).format('DD-MM-YYYY')}</NormalText>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: status => <StatusCellTable status={status} />,
  },
  {
    title: 'Số lượng',
    dataIndex: 'productObjectsTotal',
    key: 'productObjectsTotal',
    render: productObjectsTotal => (
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
    ),
  },
  {
    align: 'center',
    title: 'Thao tác',
    dataIndex: 'id',
    key: 'id',
    render: id => <ActionCellTable id={id} name="product" />,
  },
];

const option = {
  isVisible: true,
  whiteList: ['order', 'take', 'page', 'where'],
};

const initValue = [
  {
    key: 'all',
    value: 'all',
    name: 'Tất cả các danh mục',
  },
];

function ProductListPage() {
  const farmID = useSelector(state => state.farm.item.id);

  const [form] = Form.useForm();
  const [query, setQuery] = useState({
    ...productQueryInit,
    'where.farmID': farmID,
  });

  const { data: categoryList } = useFetch({
    selector: state => state.category.list,
    action: findCategory,
    query: categoryQuery,
    initValue,
  });

  const { isLoading, data: productList, pagination } = useFetchDataTable({
    selector: state => state.product.tableList,
    action: findForTableList,
    query,
    option,
    deps: [query],
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
    if (categoryList.length > 0) {
      form.setFieldsValue({
        'where.subCategory.categoryID': 'all',
      });
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
        title="Loại sản phẩm"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
        url="/product/create"
      />
      <WrapperContent>
        <Form onValuesChange={handleFilterFormChange} form={form}>
          <TitleText>Danh sách loại sản phẩm</TitleText>
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
              <Form.Item
                style={{ marginBottom: 0 }}
                name="where.subCategory.categoryID"
              >
                <CSelectFilter
                  width={220}
                  list={categoryList}
                  placeholder="Lọc theo danh mục"
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
                  ({productList.length} trong {pagination.total} loại sản phẩm)
                </NormalText>
              </Form.Item>
            </Space>
            <Form.Item name="search">
              <SearchTable placeholder="Tìm theo tên loại sản phẩm" />
            </Form.Item>
          </WrapperFilter>
        </Form>
        <Table
          onChange={handlePaginationChange}
          pagination={pagination}
          locale={{ emptyText: 'Không tìm thấy sản phẩm' }}
          columns={isLoading ? renderTableSkeleton(skeletonData) : columns}
          dataSource={isLoading ? skeletonList : productList}
        />
      </WrapperContent>
    </>
  );
}

export default ProductListPage;
