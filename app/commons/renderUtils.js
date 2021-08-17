import React from 'react';
import { Space, Skeleton } from 'antd';

const renderTableSkeleton = columns => {
  const skeleton = columns.map((column, index) => {
    let renderContent;

    if (column.type === 'image') {
      renderContent = (
        <Space>
          <Skeleton.Image
            style={{ width: 60, height: 60 }}
            size="large"
            active
          />
          <Skeleton.Input size="small" style={{ width: column.width }} active />
        </Space>
      );
    } else {
      renderContent = (
        <Skeleton.Input size="small" style={{ width: column.width }} active />
      );
    }

    return {
      title: column.title,
      key: index.toString(),
      render: () => renderContent,
    };
  });

  return skeleton;
};

export { renderTableSkeleton };
