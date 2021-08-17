import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Dropdown, Menu, Table, Space, Form, Skeleton } from 'antd';
import styled from 'styled-components';
import { CaretDownOutlined, FilterFilled } from '@ant-design/icons';

import {
  CSelectFilter,
  InfoCellTable,
  NormalText,
  PageTitleBar,
  TitleText,
  SearchTable,
  OrderTable,
  ActionButton,
  Space as Spacing,
} from 'components';

import { CreateDiaryModal } from 'containers/ProductObject/components';

import { renderObjectType } from 'commons/functionUtils';

import { useFetchDataTable, useFetch } from 'hooks';

import { findForTableList } from 'containers/ProductObject/productObjectSlice';
import { find as findCategory } from 'containers/HomePage/categorySlice';

import {
  skeletonList,
  orderList,
  statusList,
  objectTypeList,
} from 'containers/ProductObject/commons/data';
import {
  category as categoryQuery,
  productObject as productObjectQueryInit,
} from 'containers/ProductObject/commons/query';

const { useForm } = Form;

const CMenuItem = styled(Menu.Item)`
  padding: 12px 24px !important;
  font-weight: 500 !important;
`;

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
  height: 44px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 6px;
`;

const columnsSkeleton = [
  {
    title: 'Mã loại',
    dataIndex: 'code',
    key: 'code',
    render: () => <Skeleton.Input size="small" style={{ width: 130 }} active />,
  },
  {
    title: 'Tên loại sản phẩm',
    width: 200,
    dataIndex: 'name',
    key: 'name',
    render: () => (
      <Space>
        <Skeleton.Image style={{ width: 60, height: 60 }} size="large" active />
        <Skeleton.Input size="small" style={{ width: 80 }} active />
      </Space>
    ),
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: () => <Skeleton.Input size="small" style={{ width: 70 }} active />,
  },
  {
    title: 'Danh mục con',
    dataIndex: 'total',
    key: 'total',
    render: () => <Skeleton.Input size="small" style={{ width: 70 }} active />,
  },
  {
    title: 'Vùng sản xuất',
    dataIndex: 'total',
    key: 'total',
    render: () => <Skeleton.Input size="small" style={{ width: 100 }} active />,
  },
  {
    align: 'center',
    title: 'Thao tác',
    key: 'action',
    render: () => <Skeleton.Button style={{ width: 120 }} active />,
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

function ProductObjectListPage({ productObject }) {
  const farmID = useSelector(state => state.farm.item.id);

  const [form] = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [item, setItem] = useState(undefined);
  const [query, setQuery] = useState({
    ...productObjectQueryInit,
    'where.type': productObject.type,
    'where.product.farmID': farmID,
  });

  const { data: categoryList } = useFetch({
    selector: state => state.category.list,
    action: findCategory,
    query: categoryQuery,
    initValue,
  });

  // TODO: fix bug duplicate API
  const deps = [query, productObject.type];

  const { isLoading, data: productObjectList, pagination } = useFetchDataTable({
    selector: state => state.productObject.tableList,
    action: findForTableList,
    query,
    option,
    deps,
  });

  const handleShowModal = value => {
    setIsVisible(true);
    setItem({ ...value, field: 'productObjectID' });
  };

  const handleCancelModal = () => {
    setIsVisible(false);
  };

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
    if (objectTypeList.length > 0) {
      form.setFieldsValue({ 'where.objectType': 'all' });
    }
    if (categoryList.length > 0) {
      form.setFieldsValue({
        'where.product.subCategory.categoryID': 'all',
      });
    }
    if (orderList.length > 0) {
      form.setFieldsValue({ order: query.order });
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const menu = value => (
    <Menu>
      <CMenuItem key="0" onClick={() => handleShowModal(value)}>
        Thêm nhật ký
      </CMenuItem>
      <CMenuItem key="1">
        <Link to={`/${productObject.path}/${value.id}/detail?tab=1`}>
          Xem chi tiết
        </Link>
      </CMenuItem>
      <CMenuItem key="2">
        <Link to={`/${productObject.path}/${value.id}/detail?tab=1`}>
          Chỉnh sửa
        </Link>
      </CMenuItem>
      <CMenuItem key="3">Ẩn sản phẩm</CMenuItem>
    </Menu>
  );

  const columns = [
    {
      title: 'Mã loại',
      dataIndex: 'code',
      key: 'code',
      render: code => <NormalText>{code}</NormalText>,
    },
    {
      title: 'Tên loại sản phẩm',
      dataIndex: 'infoBox',
      key: 'infoBox',
      render: infoBox => (
        <InfoCellTable name={infoBox.name} img={infoBox.img} />
      ),
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
      title: 'Danh mục con',
      dataIndex: 'objectType',
      key: 'objectType',
      render: objectType => renderObjectType(objectType),
    },
    {
      title: 'Vùng sản xuất',
      dataIndex: 'area',
      key: 'area',
      render: area => (
        <Space size="middle">
          <NormalText>{area ? area.name : 'Trống'}</NormalText>
        </Space>
      ),
    },
    {
      align: 'center',
      title: 'Thao tác',
      key: 'action',
      render: cell => (
        <Dropdown trigger={['click']} overlay={menu(cell)}>
          <ActionButton>
            Lựa chọn <CaretDownOutlined />
          </ActionButton>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <CreateDiaryModal
        item={item}
        isVisible={isVisible}
        onCancel={handleCancelModal}
      />
      <PageTitleBar
        title={productObject.name}
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
        url={`/${productObject.path}/create`}
      />
      <WrapperContent>
        <Form onValuesChange={handleFilterFormChange} form={form}>
          <TitleText>Danh sách {productObject.name}</TitleText>
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
                name="where.product.subCategory.categoryID"
              >
                <CSelectFilter
                  width={220}
                  list={categoryList}
                  placeholder="Lọc theo danh mục"
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }} name="where.objectType">
                <CSelectFilter
                  width={220}
                  list={objectTypeList}
                  placeholder="Lọc theo loại đối tượng"
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
                  ({productObjectList.length} trong {pagination.total} loại sản
                  phẩm)
                </NormalText>
              </Form.Item>
            </Space>
            <Form.Item name="search">
              <SearchTable placeholder={`Tìm theo tên ${productObject.name}`} />
            </Form.Item>
          </WrapperFilter>
        </Form>
        <Table
          onChange={handlePaginationChange}
          pagination={pagination}
          locale={{ emptyText: 'Không tìm thấy sản phẩm' }}
          columns={isLoading ? columnsSkeleton : columns}
          dataSource={isLoading ? skeletonList : productObjectList}
        />
      </WrapperContent>
    </>
  );
}

ProductObjectListPage.propTypes = {
  productObject: PropTypes.object,
};

export default ProductObjectListPage;
