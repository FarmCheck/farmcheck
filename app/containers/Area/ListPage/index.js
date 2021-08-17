import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Space, Form } from 'antd';
import styled from 'styled-components';
import { PlusCircleFilled, FilterFilled } from '@ant-design/icons';

import { renderTableSkeleton } from 'commons/renderUtils';

import {
  PageTitleBar,
  CSelectFilter,
  InfoCellTable,
  NormalText,
  TitleText,
  SearchTable,
  OrderTable,
  ActionCellTable,
  AddItemButton,
  Space as Spacing,
} from 'components';

import { useFetchDataTable } from 'hooks';

import { findForTableList } from 'containers/Area/areaSlice';

import {
  skeletonData,
  skeletonList,
  statusList,
  orderList,
  locationList,
} from 'containers/Area/commons/data';
import { area as areaQueryInit } from 'containers/Area/commons/query';

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 6px;
  padding: 24px;
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

const WrapperFilter = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 18px 0px;
`;

const columns = [
  {
    title: 'Mã SKU',
    dataIndex: 'code',
    key: 'code',
    render: code => <NormalText>{code}</NormalText>,
  },
  {
    title: 'Tên vùng',
    dataIndex: 'infoBox',
    key: 'infoBox',
    render: infoBox => <InfoCellTable name={infoBox.name} img={infoBox.img} />,
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
    title: 'Tổng đối tượng',
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
    render: id => <ActionCellTable id={id} name="area" />,
  },
];

const option = {
  isVisible: true,
  whiteList: ['order', 'take', 'page', 'where'],
};

function AreaListPage() {
  const farmID = useSelector(state => state.farm.item.id);

  const [form] = Form.useForm();
  const [query, setQuery] = useState({
    ...areaQueryInit,
    'where.farmID': farmID,
  });

  const { isLoading, data: areaList, pagination } = useFetchDataTable({
    selector: state => state.area.tableList,
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
    if (locationList.length > 0) {
      form.setFieldsValue({ 'where.location.provinceCode': 'all' });
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
        title="Vùng sản xuất"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
          tưởng về khả năng khống chế dịch của Việt Nam."
        url="/area/create"
      />
      <WrapperContent>
        <Form onValuesChange={handleFilterFormChange} form={form}>
          <TitleText>Danh sách vùng sản xuất</TitleText>
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
                name="where.location.provinceCode"
              >
                <CSelectFilter
                  width={220}
                  list={locationList}
                  placeholder="Lọc theo địa phương"
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
                  ({areaList.length} trong {pagination.total} vùng sản xuất)
                </NormalText>
              </Form.Item>
            </Space>
            <Form.Item name="search">
              <SearchTable placeholder="Tìm theo tên vùng sản xuất" />
            </Form.Item>
          </WrapperFilter>
        </Form>
        <Table
          onChange={handlePaginationChange}
          pagination={pagination}
          locale={{ emptyText: 'Không tìm thấy sản phẩm' }}
          columns={isLoading ? renderTableSkeleton(skeletonData) : columns}
          dataSource={isLoading ? skeletonList : areaList}
        />
      </WrapperContent>
    </>
  );
}

export default AreaListPage;
