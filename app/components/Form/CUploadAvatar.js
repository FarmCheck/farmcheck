import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Upload, Avatar } from 'antd';
import { CameraFilled, LoadingOutlined } from '@ant-design/icons';

import CFormItem from 'components/Form/CFormItem';

import { env } from 'env';

const CUpload = styled(Upload)`
  position: relative;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1));
  .avatar-uploader > .ant-upload {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: #f6fcf9;
    border: 2px solid #ffffff;
  }

  .ant-upload.ant-upload-select-picture-card {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    border: none;
    background: #f6fcf9;
    border: 2px solid #ffffff;
  }

  .ant-upload.ant-upload-select-picture-card img {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: #f6fcf9;
    border: 2px solid #ffffff;
  }
`;

const WrapperCamera = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background: #39b54a;
  border-radius: 50%;
  bottom: 0px;
  left: 170px;
`;

const CUploadAvatar = ({
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
    setLoading(false);
  };

  const uploadButton = (
    <WrapperCamera>
      {loading ? (
        <LoadingOutlined style={{ fontSize: '30px', color: '#fff' }} />
      ) : (
        <CameraFilled style={{ fontSize: '24px', color: '#fff' }} />
      )}
    </WrapperCamera>
  );

  useEffect(() => {
    if (initUrl.length !== 1) {
      setUrl(initUrl);
    }
  }, []);

  return (
    <CFormItem
      valuePropName={valuePropName}
      name={name}
      getValueFromEvent={getValueFromEvent}
      marginouter="0px !important"
      margininer="0px !important"
    >
      <CUpload
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
        {url ? (
          <>
            <img src={url} alt="st" />
            {uploadButton}
          </>
        ) : (
          <>
            <Avatar
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '100px',
                backgroundColor: '#f56a00',
                verticalAlign: 'middle',
              }}
              size="large"
            >
              {' '}
              {initUrl}{' '}
            </Avatar>
            {uploadButton}
          </>
        )}
      </CUpload>
    </CFormItem>
  );
};

CUploadAvatar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  valuePropName: PropTypes.string,
  initUrl: PropTypes.any,
  getValueFromEvent: PropTypes.func,
};

export default CUploadAvatar;
