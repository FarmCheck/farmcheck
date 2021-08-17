import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Upload } from 'antd';
import { FileImageOutlined, LoadingOutlined } from '@ant-design/icons';

import CFormItem from 'components/Form/CFormItem';

import { env } from 'env';

const CustomUpload = styled(Upload)`
  position: relative;
  padding: 12px;
  border: 1px solid #f1f1f1;
  border-radius: 6px;
  width: auto !important;

  .avatar-uploader > .ant-upload {
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 6px;
    background: #f6fcf9;
  }

  .ant-upload.ant-upload-select-picture-card {
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 6px;
    border: none;
    background: #f6fcf9;
    margin-right: 0px;
    margin-bottom: 0px;
  }

  .ant-upload.ant-upload-select-picture-card img {
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 6px;
    background: #f6fcf9;
  }
`;

const CUploadSingle = ({
  disabled,
  width,
  height,
  name,
  valuePropName,
  initUrl,
  getValueFromEvent,
}) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const handleChangeImg = async ({ file }) => {
    if (file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (file.status !== 'uploading') {
      const urlNew = file.response.msg[0].url[0];
      setUrl(urlNew);
    }

    getValueFromEvent();
  };

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined style={{ fontSize: '30px', color: '#2AC17E' }} />
      ) : (
        <FileImageOutlined style={{ fontSize: '30px', color: '#2AC17E' }} />
      )}
    </div>
  );

  useEffect(() => {
    if (initUrl) {
      if (initUrl.response) {
        const newUrl = initUrl.response && initUrl.response.msg[0].url[0];
        setUrl(newUrl);
      } else {
        setUrl(initUrl);
      }
    }
  }, [initUrl]);

  return (
    <CFormItem
      valuePropName={valuePropName}
      name={name}
      getValueFromEvent={getValueFromEvent}
      marginouter="0px !important"
      margininer="0px !important"
    >
      <CustomUpload
        width={width}
        height={height}
        disabled={disabled}
        name="avatar"
        action={`${env.farmhub.uploadService}/cdn?id=123&type=image`}
        onChange={handleChangeImg}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
      >
        {url ? <img src={url} alt="st" /> : uploadButton}
      </CustomUpload>
    </CFormItem>
  );
};

CUploadSingle.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  valuePropName: PropTypes.string,
  initUrl: PropTypes.any,
  getValueFromEvent: PropTypes.func,
};

export default CUploadSingle;
