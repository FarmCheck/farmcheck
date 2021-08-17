import styled from 'styled-components';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { Table, Menu, Dropdown, Skeleton, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import { NormalText, ActionButton, StatusCellTable } from 'components';
import { useFetchDataTable } from 'hooks';

import { skeletonList } from 'containers/ProductObject/commons/data';
import { section as queryInit } from 'containers/ProductObject/commons/query';

import {
  CreateDiaryModal,
  ShowDiaryModal,
} from 'containers/ProductObject/components';

import { findForTableList } from 'containers/ProductObject/sectionSlice';

const CMenuItem = styled(Menu.Item)`
  padding: 12px 24px !important;
  font-weight: 500 !important;
`;

const columnsSkeleton = [
  {
    title: 'Mã mùa vụ',
    dataIndex: 'code',
    key: 'code',
    render: () => <Skeleton.Input size="small" style={{ width: 130 }} active />,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: () => <Skeleton.Input size="small" style={{ width: 70 }} active />,
  },
  {
    title: 'Vùng trồng trọt',
    dataIndex: 'areaName',
    key: 'areaName',
    render: () => <Skeleton.Input size="small" style={{ width: 100 }} active />,
  },
  {
    title: 'Quy trình',
    dataIndex: 'processName',
    key: 'processName',
    render: () => <Skeleton.Input size="small" style={{ width: 100 }} active />,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
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
  isVisible: false,
  whiteList: ['order', 'take', 'page', 'where'],
};

export function SectionStep({ productObjectID }) {
  const farmID = useSelector(state => state.farm.item.id);

  const [isVisibleShowDiary, setIsVisibleShowDiary] = useState(false);
  const [isVisibleCreateDiary, setIsVisibleCreateDiary] = useState(false);
  const [item, setItem] = useState(undefined);
  const [query, setQuery] = useState({
    ...queryInit,
    where: {
      process: { farmID },
      productObjectID,
    },
  });

  const { isLoading, data: sectionList, pagination } = useFetchDataTable({
    selector: state => state.section.tableList,
    action: findForTableList,
    query,
    option,
    deps: query,
  });

  const handlePaginationChange = e => {
    setQuery({
      ...query,
      page: e.current,
      take: e.pageSize,
    });
  };

  const handleShowModal = (value, name) => {
    if (name === 'showDiary') {
      setIsVisibleShowDiary(true);
      setItem(value);
    } else if (name === 'createDiary') {
      setIsVisibleCreateDiary(true);
      setItem({ ...value, field: 'sectionID' });
    }
  };

  const handleCancelModal = name => {
    if (name === 'showDiary') {
      setIsVisibleShowDiary(false);
    } else if (name === 'createDiary') {
      setIsVisibleCreateDiary(false);
    }
  };

  const menu = value => (
    <Menu>
      <CMenuItem key="0" onClick={() => handleShowModal(value, 'createDiary')}>
        Thêm nhật ký
      </CMenuItem>
      <CMenuItem key="2" onClick={() => handleShowModal(value, 'showDiary')}>
        Xem nhanh
      </CMenuItem>
      <CMenuItem key="3">Ngưng sản xuất</CMenuItem>
    </Menu>
  );

  const columns = [
    {
      title: 'Mã mùa vụ',
      dataIndex: 'code',
      key: 'code',
      render: code => <span>{code}</span>,
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
      title: 'Vùng trồng trọt',
      dataIndex: 'areaName',
      key: 'areaName',
      render: areaName => (
        <Space size="middle">
          <NormalText>{areaName || 'Trống'}</NormalText>
        </Space>
      ),
    },
    {
      title: 'Quy trình',
      dataIndex: 'processName',
      key: 'processName',
      render: processName => (
        <Space size="middle">
          <NormalText>{processName || 'Trống'}</NormalText>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: status => <StatusCellTable status={status} />,
    },
    {
      align: 'center',
      title: 'Thao tác',
      key: 'action',
      render: value => (
        <Dropdown trigger={['click']} overlay={menu(value)}>
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
        isVisible={isVisibleCreateDiary}
        onCancel={() => handleCancelModal('createDiary')}
      />
      <ShowDiaryModal
        item={item}
        isVisible={isVisibleShowDiary}
        onCancel={() => handleCancelModal('showDiary')}
      />
      <Table
        onChange={handlePaginationChange}
        pagination={pagination}
        locale={{ emptyText: 'Không tìm thấy mùa vụ' }}
        columns={isLoading ? columnsSkeleton : columns}
        dataSource={isLoading ? skeletonList : sectionList}
      />
    </>
  );
}

SectionStep.propTypes = {
  productObjectID: PropTypes.string,
};

export default SectionStep;
