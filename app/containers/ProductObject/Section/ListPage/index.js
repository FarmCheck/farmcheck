import styled from 'styled-components';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import PropTypes from 'prop-types';

import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  Menu,
  Dropdown,
  Modal,
  Timeline,
  Form,
  Skeleton,
  Space,
} from 'antd';
import { CaretDownOutlined, ScissorOutlined } from '@ant-design/icons';

import {
  NameText,
  NormalText,
  ActionButton,
  InputText,
  CSelect,
  CButton,
  CUploadList,
  CDatePicker,
  Notification,
  StatusCellTable,
} from 'components';

import { parseUtils } from 'commons/parseUtils';

import { DiaryItem } from 'containers/ProductObject/components';

import {
  skeletonList,
  pagination as paginationInit,
} from 'containers/ProductObject/commons/data';
import {
  section as sectionQueryInit,
  step as stepQuery,
} from 'containers/ProductObject/commons/query';

import { findForTableList as findSectionForTableList } from 'containers/ProductObject/sectionSlice';
import { find as findStep } from 'containers/ProductObject/stepSlice';
import { create as createDiary } from 'containers/ProductObject/diarySlice';

const CMenuItem = styled(Menu.Item)`
  padding: 12px 24px !important;
  font-weight: 500 !important;
`;

const CTimelineDot = styled(Timeline.Item)`
  .ant-timeline-item-head {
    margin-left: -9px !important;
    width: 20px;
    height: 20px;
    border: 4px solid ${props => props.theme.primaryColor};
  }
`;

const CusTomTimeline = styled(Timeline)`
  .ant-timeline-item-label {
    width: 50px !important;
  }
  .ant-timeline-item-content {
    left: calc(15% - 4px) !important;
  }
  .ant-timeline-item-tail {
    left: 15% !important;
  }
  .ant-timeline-item-head {
    left: 15% !important;
  }
`;

const WrapperIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background: ${props => props.theme.dropdownColor};
  border-radius: 50%;
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

export function SectionListStep({ match }) {
  const dispatch = useDispatch();

  const sectionList = useSelector(state => state.section.tableList);
  const stepList = useSelector(state => state.step.list);
  const farmID = useSelector(state => state.farm.item.id);

  const [form] = Form.useForm();
  const [step, setStep] = React.useState('');
  const [countImg, setCountImg] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = React.useState(false);
  const [pagination, setPagination] = React.useState(paginationInit);
  const [sectionQuery, setSectionQuery] = React.useState({
    ...sectionQueryInit,
    where: {
      process: { farmID },
      productObjectID: match.params.id,
    },
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSetPagination = e => {
    setSectionQuery({
      ...sectionQuery,
      page: e.current,
      take: e.pageSize,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalCreateDiary = item => {
    const { id: sectionID, processID } = item;
    dispatch(
      findStep({
        ...stepQuery,
        where: { ...stepQuery.where, processID, process: { farmID } },
      }),
    );
    form.setFieldsValue({ sectionID, createdAt: moment() });
    setIsModalVisibleAdd(true);
  };

  const handleSubmitCreateDiary = () => {
    form.validateFields().then(async values => {
      const body = {
        ...values,
        sectionID: form.getFieldValue('sectionID'),
      };

      parseUtils(body, 'urls', 'url');

      Notification('info', 'Đang thêm mới nhật ký');
      setIsSubmitting(true);

      try {
        const actionResult = await dispatch(createDiary(body));
        unwrapResult(actionResult);

        setIsSubmitting(false);

        Notification('success', 'Thêm mới nhật ký thành công');

        setCountImg(0);
        form.setFieldsValue({
          name: '',
          description: '',
          createdAt: moment(),
          url: [],
        });
      } catch (error) {
        setIsSubmitting(false);

        Notification('error', 'Thêm mới nhật ký thất bại', error.message);
      }
    });
  };

  const handleCancelCreateDiary = () => {
    cleanUpForm();
    setIsModalVisibleAdd(false);
  };

  const handleChangeImg = e => {
    if (Array.isArray(e)) {
      return e;
    }

    const { fileList } = e;
    if (Array.isArray(fileList)) {
      setCountImg(fileList.length);
    }

    return e && e.fileList;
  };

  const cleanUpForm = () => {
    setStep('');
    setIsLoading(false);
    setCountImg(0);
    form.resetFields(['createdAt', 'name', 'description', 'urls', 'stepID']);
  };

  const loadTableData = async () => {
    const orderQuery = {};
    orderQuery[sectionQuery.order.name] = sectionQuery.order.value;

    setIsLoading(true);
    try {
      const actionResult = await dispatch(
        findSectionForTableList({
          ...sectionQuery,
          order: orderQuery,
        }),
      );
      const { pagination: paginationResult } = unwrapResult(actionResult);

      setPagination(paginationResult);
    } catch (error) {
      Notification('error', 'Tải dữ liệu thất bại', error);
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    loadTableData();
  }, [sectionQuery]);

  const Icon = (
    <WrapperIcon>
      <ScissorOutlined style={{ fontSize: '20px', color: '#39B54A' }} />
    </WrapperIcon>
  );

  const menu = item => (
    <Menu>
      <CMenuItem key="0" onClick={() => showModalCreateDiary(item)}>
        Thêm nhật ký
      </CMenuItem>
      <Modal
        title={`Thêm mới nhật ký cho ${item.name}`}
        visible={isModalVisibleAdd}
        onOk={handleSubmitCreateDiary}
        onCancel={handleCancelCreateDiary}
        footer={[
          <CButton key="0" onClick={handleCancelCreateDiary}>
            Hủy
          </CButton>,
          <CButton
            key="1"
            type="primary"
            loading={isSubmitting}
            onClick={handleSubmitCreateDiary}
          >
            Xác nhận
          </CButton>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            style={{ width: '100%' }}
            label={<NameText>Chọn bước muốn thêm nhật ký</NameText>}
            name="stepID"
            rules={[
              {
                required: true,
                message: 'Bạn chưa chọn bước trong qui trình',
              },
            ]}
          >
            <CSelect
              onChange={value => {
                setStep(value);
              }}
              list={stepList}
              placeholder="Chọn bước qui trình"
            />
          </Form.Item>

          {step !== '' && (
            <>
              <Form.Item
                style={{ width: '100%' }}
                label={<NameText>Tên nhật ký</NameText>}
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Bạn chưa tên nhật ký',
                  },
                ]}
              >
                <InputText placeholder="Bón phân, nhổ cỏ" size="large" />
              </Form.Item>

              <Form.Item
                style={{ width: '100%' }}
                label={<NameText>Mô tả về nhật ký</NameText>}
                name="description"
              >
                <InputText
                  placeholder="Mô tả chi tiết về quá trình thực hiện"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                style={{ width: '100%' }}
                label={<NameText>Hình ảnh</NameText>}
              >
                <CUploadList
                  valuePropName="fileList"
                  name="urls"
                  getValueFromEvent={handleChangeImg}
                  count={countImg}
                />
              </Form.Item>

              <Form.Item
                style={{ width: '100%' }}
                label={<NameText>Thời gian</NameText>}
                name="createdAt"
              >
                <CDatePicker
                  showTime
                  format="MM/DD/YYYY HH:mm:ss"
                  size="large"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
      <CMenuItem onClick={showModal} key="2">
        Xem chi tiết
      </CMenuItem>
      <Modal
        onCancel={handleCancel}
        width={600}
        title="Nhật ký - Mùa vụ #1 - Cây lan"
        footer={false}
        visible={isModalVisible}
      >
        <CusTomTimeline pending="Waiting new process..." mode="left">
          <CTimelineDot position="left" label={Icon}>
            <DiaryItem />
          </CTimelineDot>
          <CTimelineDot position="left" label={Icon}>
            <DiaryItem />
          </CTimelineDot>
          <CTimelineDot position="left" label={Icon}>
            <DiaryItem />
          </CTimelineDot>
        </CusTomTimeline>
      </Modal>
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
      render: area => (
        <Space size="middle">
          <NormalText>{area ? area.name : 'Trống'}</NormalText>
        </Space>
      ),
    },
    {
      title: 'Quy trình',
      dataIndex: 'processName',
      key: 'processName',
      render: area => (
        <Space size="middle">
          <NormalText>{area ? area.name : 'Trống'}</NormalText>
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
      render: item => (
        <Dropdown trigger={['click']} overlay={menu(item)}>
          <ActionButton>
            Lựa chọn <CaretDownOutlined />
          </ActionButton>
        </Dropdown>
      ),
    },
  ];

  return (
    <Table
      onChange={handleSetPagination}
      pagination={pagination}
      locale={{ emptyText: 'Không tìm thấy mùa vụ' }}
      columns={isLoading ? columnsSkeleton : columns}
      dataSource={isLoading ? skeletonList : sectionList}
    />
  );
}

SectionListStep.propTypes = {
  match: PropTypes.any,
};

export default SectionListStep;
