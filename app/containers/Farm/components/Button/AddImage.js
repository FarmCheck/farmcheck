import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PlusOutlined, AimOutlined } from '@ant-design/icons';
import { Modal, Form, Tooltip, Spin } from 'antd';
import { parseUtils } from 'commons/parseUtils';
import { removeVietnameseTones } from 'commons/functionUtils';
import location from 'public/static/location.json';

import {
  CButton,
  InputText,
  CTextArea,
  CUploadSingle,
  Notification,
} from 'components';

import { FarmApi } from 'api/farm';

const CModal = styled(Modal)`
  position: relative;
  padding: 0px !important;
  .ant-modal-body {
    height: 560px;
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

const initProvince = {
  province_code: '0',
  province_name: 'Tất cả',
  districtInfo: [],
};

const initDistrict = {
  district_code: '0',
  district_name: 'Tất cả',
  province_code: '0',
  province_name: 'Tất cả',
};

const CButtonAddImage = ({ onCreateImage }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      parseUtils(values, 'image', 'image');
      onCreateImage(values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeImage = e => e && e.file;

  const handleGetCurrentLocation = () => {
    setIsLoadingAddress(true);
    if (typeof window !== 'undefined' && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        FarmApi.getLocationInfo(
          position.coords.latitude,
          position.coords.longitude,
        )
          .then(res => {
            setIsLoadingAddress(false);
            const indexFirstWhiteSpace = res.plus_code.compound_code.indexOf(
              ' ',
            );
            const originAddress = res.plus_code.compound_code.substring(
              indexFirstWhiteSpace,
              res.plus_code.compound_code.length,
            );
            const address = removeVietnameseTones(originAddress);
            let currentProvince = initProvince;
            let currentDistrict = initDistrict;

            location.forEach(province => {
              let prefixProvince = '';

              if (province.province_name.includes('Tỉnh ')) {
                prefixProvince = 'Tỉnh ';
              } else {
                prefixProvince = 'Thành phố ';
              }
              if (
                address.includes(
                  removeVietnameseTones(
                    province.province_name.replace(prefixProvince, ''),
                  ),
                )
              ) {
                currentProvince = province;
                currentProvince.districtInfo.forEach(district => {
                  let prefixDistrict = '';
                  if (district.district_name.includes('Huyện ')) {
                    prefixDistrict = 'Huyện ';
                  } else if (district.district_name.includes('Thị xã ')) {
                    prefixDistrict = 'Thị xã ';
                  } else {
                    prefixDistrict = 'Quận ';
                  }
                  if (
                    address.includes(
                      removeVietnameseTones(
                        district.district_name.replace(prefixDistrict, ''),
                      ),
                    )
                  ) {
                    currentDistrict = district;
                  }
                });

                const resultAddress = `${currentDistrict.district_name}, ${
                  currentDistrict.province_name
                }`;
                form.setFieldsValue({ address: resultAddress });
                FarmApi.getLocationID(
                  currentDistrict.province_code,
                  currentDistrict.district_code,
                ).then(resp => {
                  form.setFieldsValue({
                    locationID: resp[0].id,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                });
              }
            });
          })
          .catch(() => {
            setIsLoadingAddress(false);
            Notification('error', 'Lấy vị trí thất bại');
          });
      });
    } else {
      setIsLoadingAddress(false);
      Notification('error', 'Thiết bị không hỗ trợ định vị');
    }
  };

  return (
    <>
      <CButton type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Thêm ảnh
      </CButton>
      <CModal
        title="Thêm hình ảnh"
        centered
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
        <Form form={form} layout="vertical">
          <Form.Item label="Hình ảnh upload">
            <CUploadSingle
              valuePropName="file"
              name="image"
              width="448px"
              height="240px"
              getValueFromEvent={handleChangeImage}
            />
          </Form.Item>
          <Form.Item label="Tiêu đề ảnh" name="name">
            <InputText placeholder="Nhập tiêu đề" />
          </Form.Item>
          <Form.Item label="Vị trí ảnh" name="address">
            <InputText
              placeholder="Lấy vị trí ảnh"
              style={{
                border: '1px solid #d9d9d9',
                fontSize: '15px !important',
              }}
              suffix={
                <Tooltip title="Lấy vị trí">
                  {!isLoadingAddress ? (
                    <AimOutlined
                      onClick={handleGetCurrentLocation}
                      style={{ color: '#39B54A', fontSize: '20px' }}
                    />
                  ) : (
                    <Spin style={{ color: '#39B54A', fontSize: '20px' }} />
                  )}
                </Tooltip>
              }
              size="large"
            />
          </Form.Item>
          <Form.Item label="Mô tả ảnh" name="description">
            <CTextArea rows={4} placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </CModal>
    </>
  );
};

CButtonAddImage.propTypes = {
  onCreateImage: PropTypes.func,
};

export default CButtonAddImage;
