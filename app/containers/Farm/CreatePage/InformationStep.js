import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, Tooltip, Spin } from 'antd';
import location from 'public/static/location.json';
import {
  TitleText,
  NameText,
  Space,
  InputText,
  Notification,
} from 'components';
import { AimOutlined } from '@ant-design/icons';
import { FarmApi } from 'api/farm';

import {
  removeVietnameseTones,
  isVietnamesePhoneNumber,
  validateEmail,
} from 'commons/functionUtils';

const CFormItem = styled(Form.Item)`
  min-height: 50px;

  .ant-form-item-control-input {
    height: 50px;

    .ant-form-item-control-input-content {
      height: 50px;

      .ant-input-affix-wrapper {
        height: 50px;
        border-radius: 6px;
        border-color: #595959;

        .ant-input {
          &::placeholder {
            color: #595959 !important;
          }
        }
      }
    }
  }
`;

const DivRow = styled.div`
  width: 100%;
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

const InformationStep = ({ form, onSetBodyUpdate }) => {
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const handleVerifyEmail = e => {
    setIsValidEmail(validateEmail(e.target.value));
  };

  const handleVerifyPhone = e => {
    setIsValidPhoneNumber(isVietnamesePhoneNumber(e.target.value));
  };

  const handleGetCurrentLocation = () => {
    setIsLoadingAddress(true);
    if (typeof window !== 'undefined' && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        FarmApi.getLocationInfo(
          position.coords.latitude,
          position.coords.longitude,
        ).then(res => {
          setIsLoadingAddress(false);
          const indexFirstWhiteSpace = res.plus_code.compound_code.indexOf(' ');
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
        });
      });
    } else {
      setIsLoadingAddress(false);
      Notification('error', 'Thiết bị không hỗ trợ định vị');
    }
  };

  return (
    <>
      <TitleText>Thêm thông tin tài khoản</TitleText>
      <Space height={12} />

      <Form
        style={{ width: 380 }}
        form={form}
        layout="vertical"
        name="normal_login"
        className="login-form"
        onValuesChange={onSetBodyUpdate}
      >
        <CFormItem
          label={<NameText>Tên nông trại</NameText>}
          name="name"
          rules={[
            {
              required: true,
              message: 'Hãy nhập tên nông trại!',
            },
          ]}
        >
          <InputText
            style={{ border: '1px solid #d9d9d9', fontSize: '15px !important' }}
            size="large"
          />
        </CFormItem>
        <CFormItem
          name="email"
          label={<NameText>Email</NameText>}
          help={
            isValidEmail ? null : (
              <span style={{ color: 'red' }}>Email không hợp lệ!</span>
            )
          }
          rules={[
            {
              required: true,
              message: 'Hãy nhập email!',
            },
          ]}
        >
          <InputText
            onChange={handleVerifyEmail}
            size="large"
            style={{ border: '1px solid #d9d9d9', fontSize: '15px !important' }}
          />
        </CFormItem>
        <CFormItem
          name="phoneNumber"
          label={<NameText>Số điện thoại</NameText>}
          help={
            isValidPhoneNumber ? null : (
              <span style={{ color: 'red' }}>Số điện thoại không hợp lệ!</span>
            )
          }
          rules={[
            {
              required: true,
              message: 'Hãy nhập số điện thoại!',
            },
          ]}
        >
          <InputText
            onChange={handleVerifyPhone}
            style={{ border: '1px solid #d9d9d9', fontSize: '15px !important' }}
            size="large"
          />
        </CFormItem>
        <CFormItem name="address" label={<NameText>Địa chỉ</NameText>}>
          <InputText
            style={{ border: '1px solid #d9d9d9', fontSize: '15px !important' }}
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
        </CFormItem>
        <DivRow />
      </Form>
      <Space height={12} />
    </>
  );
};

InformationStep.propTypes = {
  form: PropTypes.any,
  onSetBodyUpdate: PropTypes.func,
};

export default InformationStep;
