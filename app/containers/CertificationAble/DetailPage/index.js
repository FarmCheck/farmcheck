import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Empty } from 'antd';

import { PageTitleBar, CButton, Space as Spacing } from 'components';

import Item from './Item';

const WrapperContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  padding: 24px;
`;

function CertificationAbleDetailPage({
  targetID,
  targetType,
  certificationAbleList,
  setCertificationAbleList,
}) {
  const [isDone, setIsDone] = useState(true);
  const [focusingItem, setFocusingItem] = useState(0);

  const handleAdd = () => {
    const newCertificationAbleList = [{ id: Date.now().toString() }].concat(
      certificationAbleList,
    );
    setCertificationAbleList(newCertificationAbleList);
    setIsDone(false);
  };

  const handleDelete = (id, index) => {
    if (index === 0) {
      setIsDone(true);
    }

    const newCertificationAbleList = certificationAbleList.filter(
      item => item.id !== id,
    );
    setCertificationAbleList(newCertificationAbleList);
  };

  return (
    <>
      <PageTitleBar
        subTitle="Chứng nhận"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
          tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <WrapperContent>
        <Spacing height={24} />
        <CButton
          disabled={!isDone}
          style={{ width: '80%' }}
          height={80}
          type="dashed"
          onClick={handleAdd}
          block
          icon={<PlusOutlined />}
        >
          Thêm chứng nhận
        </CButton>
        <Spacing height={24} />
        {certificationAbleList.map((item, index) => (
          <Item
            targetID={targetID}
            targetType={targetType}
            key={item.id}
            detail={Object.assign(item, { index })}
            handleDelete={handleDelete}
            setIsDone={setIsDone}
            onFocus={setFocusingItem}
            focusingItem={focusingItem}
          />
        ))}

        {certificationAbleList.length === 0 && (
          <>
            <Empty
              style={{ width: '80%' }}
              description="Chưa có chứng nhận nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <Spacing height={150} />
          </>
        )}
      </WrapperContent>
    </>
  );
}

CertificationAbleDetailPage.propTypes = {
  targetType: PropTypes.string,
  targetID: PropTypes.string,
  certificationAbleList: PropTypes.array,
  setCertificationAbleList: PropTypes.func,
};

export default CertificationAbleDetailPage;
