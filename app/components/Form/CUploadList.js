import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Upload } from 'antd';
import { FileImageOutlined, StarFilled } from '@ant-design/icons';

import NormalText from 'components/Text/NormalText';
import CFormItem from 'components/Form/CFormItem';

import { env } from 'env';

const CustomUploadList = styled(Upload)`
  //display: flex;
  width: 100%;
  height: auto;
  padding: 12px 12px 4px;
  border: 1px solid #f1f1f1;
  border-radius: 6px;

  position: relative;
  .avatar-uploader > .ant-upload {
    width: 120px;
    height: 100px;
    border-radius: 6px;
    background: #f6fcf9;
  }

  .ant-upload.ant-upload-select-picture-card {
    width: 120px;
    height: 100px;
    border-radius: 6px;
    border: none;
    background: #f6fcf9;
  }

  .ant-upload.ant-upload-select-picture-card img {
    width: 120px;
    height: 100px;
    border-radius: 6px;
    background: #f6fcf9;
  }
`;

const uploadButton = (
  <div>
    <FileImageOutlined style={{ fontSize: '30px', color: '#2AC17E' }} />
  </div>
);

const CUploadList = ({ valuePropName, name, getValueFromEvent, count }) => {
  const onRemove = () => {
    // TODO: handle remove in upload service
  };

  return (
    <>
      <CFormItem
        valuePropName={valuePropName}
        name={name}
        getValueFromEvent={getValueFromEvent}
        marginouter="0px !important"
        margininer="0px !important"
      >
        <CustomUploadList
          name="files"
          action={`${env.farmhub.uploadService}/cdn?id=123&type=image`}
          listType="picture-card"
          showUploadList
          multiple
          onRemove={onRemove}
        >
          {count >= 3 ? null : uploadButton}
        </CustomUploadList>
      </CFormItem>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '6px',
        }}
      >
        <StarFilled style={{ color: '#FF6347', marginRight: '12px' }} />
        <NormalText>Tối đa 3 ảnh</NormalText>
      </div>
    </>
  );
};

CUploadList.propTypes = {
  valuePropName: PropTypes.string,
  name: PropTypes.string,
  getValueFromEvent: PropTypes.func,
  count: PropTypes.number,
};

export default CUploadList;
