import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Checkbox } from 'antd';

import { Space as Spacing, CButton, HighlightText } from 'components';

import CheckBoxCard from 'containers/Farm/components/Card/CheckBox';

const Wrapper = styled.div`
  width: 140px;
  height: 182px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const CModal = styled(Modal)`
  top: 24px !important;
  padding: 0px !important;
  .ant-modal-body {
    height: calc(100vh - 180px);
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px #ffffff;
      background-color: #ffffff;
    }

    &::-webkit-scrollbar {
      width: 10px;
      background-color: #ffffff;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #e0e0e0;
    }
  }
`;

const WrapperText = styled.div`
  display: flex;
  justify-contents: center;
  text-align: center;
  width: 100%;
  padding: 12px;
`;

const CButtonMain = styled(Button)`
  width: ${props => props.width}px !important;
  height: ${props => props.height}px !important;
  flex-shrink: 0;
`;

const CCheckBox = styled(Checkbox)`
  display: flex;
  width: auto;
  align-items: center !important;
  .ant-checkbox {
    margin-right: 24px;
  }
`;

const CheckboxContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CButtonAddOrganization = ({ width, height, list }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Wrapper>
      <CButtonMain
        type="dashed"
        block
        icon={<PlusOutlined style={{ fontSize: '30px' }} />}
        shape="circle"
        width={width}
        height={height}
        onClick={showModal}
      />
      <Spacing height={10} />
      <CModal
        title="Thêm chứng nhận"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <CButton key="1" onClick={handleCancel}>
            Hủy
          </CButton>,
          <CButton key="2" onClick={handleOk} type="primary">
            Xác nhận
          </CButton>,
        ]}
      >
        <Checkbox.Group>
          <CheckboxContent>
            {list &&
              list.map(item => (
                <>
                  <CCheckBox key={item.id} value={item.id}>
                    <CheckBoxCard name={item.name} logo={item.logo} />
                  </CCheckBox>
                  <Spacing height={24} />
                </>
              ))}
          </CheckboxContent>
        </Checkbox.Group>
      </CModal>
      <WrapperText>
        <HighlightText line="2">Thêm mới</HighlightText>
      </WrapperText>
    </Wrapper>
  );
};

CButtonAddOrganization.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  list: PropTypes.array,
};

export default CButtonAddOrganization;
