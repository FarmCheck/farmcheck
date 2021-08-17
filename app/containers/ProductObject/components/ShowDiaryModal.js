import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { ClockCircleOutlined } from '@ant-design/icons';
import { Modal, Timeline, Skeleton, Empty } from 'antd';

import { Space, MiniText, NameText, Notification } from 'components';

import DiaryItem from 'containers/ProductObject/components/DiaryItem';

import { findDiaryList } from 'containers/ProductObject/sectionSlice';

const CTimeline = styled(Timeline)`
  .ant-timeline-item-label {
    width: 50px !important;
  }
  .ant-timeline-item-content {
    left: calc(10% - 4px) !important;
  }
  .ant-timeline-item-tail {
    left: 10% !important;
  }
  .ant-timeline-item-head {
    left: 10% !important;
  }
`;

const skeleton = (
  <>
    <Skeleton avatar paragraph={{ rows: 3 }} />
    <Space height={30} />
    <Skeleton avatar paragraph={{ rows: 3 }} />
  </>
);

function ShowDiaryModal({ onCancel, item, isVisible }) {
  const dispatch = useDispatch();

  const diaryList = useSelector(state => state.section.diaryList);
  const [isLoading, setIsLoading] = useState(false);

  const initData = async () => {
    const { id: sectionID } = item;
    setIsLoading(true);
    try {
      const actionResult = await dispatch(findDiaryList(sectionID));
      unwrapResult(actionResult);
    } catch (err) {
      Notification('error', 'Tải dữ liệu thất bại', err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isVisible) {
      return;
    }
    initData();
  }, [isVisible]);

  return (
    <Modal
      title={`Nhật ký - cây trồng ${item &&
        item.productObjectName} - mùa vụ ${item && item.name}`}
      visible={isVisible}
      onCancel={onCancel}
      width={600}
      footer={false}
    >
      <CTimeline mode="left">
        {isLoading ? (
          skeleton
        ) : (
          <>
            {diaryList.length === 0 && (
              <Empty
                description="Không có nhật ký nào"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
            {diaryList.map(step => (
              <Timeline.Item
                key={step.id}
                position="left"
                dot={
                  <ClockCircleOutlined
                    style={{ fontSize: '25px', color: '#39B54A' }}
                    className="timeline-clock-icon"
                  />
                }
              >
                <NameText>{step.name}</NameText>
                <MiniText>Tổng nhật ký: {step.diariesTotal}</MiniText>
                <Space height={10} />
                {step.diaries.map(diary => (
                  <DiaryItem key={diary.id} item={diary} />
                ))}
              </Timeline.Item>
            ))}
          </>
        )}
      </CTimeline>
    </Modal>
  );
}

ShowDiaryModal.propTypes = {
  onCancel: PropTypes.func,
  item: PropTypes.object,
  isVisible: PropTypes.bool,
};

export default ShowDiaryModal;
