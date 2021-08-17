import React, { useState, useEffect } from 'react';
import { Form, Tooltip, Spin, Switch, Space } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import location from 'public/static/location.json';

import {
  Space as Spacing,
  PageTitle,
  TextEditor,
  NameText,
  InputText,
  CFormItem,
  CUploadSingle,
  Notification,
} from 'components';

import { FarmApi } from 'api/farm';

import {
  removeVietnameseTones,
  isVietnamesePhoneNumber,
  validateEmail,
} from 'commons/functionUtils';

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

function BrandStep({ form, onSetBodyUpdate }) {
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isHaveBrand, setIsHaveBrand] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const handleChangeTextEditor = value => {
    form.setFieldsValue({ description: value });
    onSetBodyUpdate({ description: value });
  };

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

  const handleChangeImg = e => e && e.file;

  const handleChangeSwitch = value => {
    setIsHaveBrand(value);
    form.setFieldsValue({ isHaveBrand: value });
  };

  useEffect(() => {
    setIsHaveBrand(form.getFieldValue('isHaveBrand'));
  }, []);

  return (
    <>
      <PageTitle
        subTitle="Thông tin nhãn hiệu sản phẩm"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <Form
        onValuesChange={onSetBodyUpdate}
        form={form}
        style={{ marginTop: '20px' }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 11 }}
        layout="horizontal"
        labelAlign="left"
      >
        <CFormItem name="isHaveBrand">
          <Space>
            <Switch
              checked={isHaveBrand}
              onChange={handleChangeSwitch}
              style={{ marginRight: '12px' }}
            />
            <NameText>Khai báo thông tin xuất xứ - nhãn hiệu riêng</NameText>
          </Space>
        </CFormItem>
        <CFormItem
          name="brandName"
          label={<NameText>Tên thương hiệu</NameText>}
        >
          <InputText disabled={!isHaveBrand} size="large" />
        </CFormItem>
        <CFormItem
          name="email"
          help={
            isValidEmail ? null : (
              <span style={{ color: 'red' }}>Email không hợp lệ!</span>
            )
          }
          label={<NameText>Địa chỉ email</NameText>}
          rules={[
            {
              required: isHaveBrand,
              message: 'Bạn chưa nhập email!',
            },
          ]}
        >
          <InputText
            disabled={!isHaveBrand}
            onChange={handleVerifyEmail}
            size="large"
          />
        </CFormItem>

        <CFormItem
          name="phoneNumber"
          help={
            isValidPhoneNumber ? null : (
              <span style={{ color: 'red' }}>Số điện thoại không hợp lệ!</span>
            )
          }
          label={<NameText>Số điện thoại</NameText>}
          rules={[
            {
              required: isHaveBrand,
              message: 'Bạn chưa nhập số điện thoại!',
            },
          ]}
        >
          <InputText
            disabled={!isHaveBrand}
            onChange={handleVerifyPhone}
            size="large"
          />
        </CFormItem>

        <CFormItem name="address" label={<NameText>Địa chỉ</NameText>}>
          <InputText
            disabled={!isHaveBrand}
            style={{
              border: '1px solid #d9d9d9',
              fontSize: '15px !important',
            }}
            suffix={
              <Tooltip title="Lấy vị trí">
                {!isHaveBrand ? ( //eslint-disable-line
                  <AimOutlined style={{ color: '#8c8c8c', fontSize: '20px' }} />
                ) : !isLoadingAddress ? (
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

        <CFormItem name="taxCode" label={<NameText>Mã số thuế</NameText>}>
          <InputText disabled={!isHaveBrand} size="large" />
        </CFormItem>

        <CFormItem name="website" label={<NameText>Website</NameText>}>
          <InputText disabled={!isHaveBrand} size="large" />
        </CFormItem>

        <CFormItem
          name="brandDescription"
          label={<NameText>Mô tả thương hiệu</NameText>}
        >
          <TextEditor
            readOnly={!isHaveBrand}
            value={form.getFieldValue('brandDescription') || ''}
            onChange={handleChangeTextEditor}
          />
          <Spacing height={42} />
        </CFormItem>

        <CFormItem label={<NameText>Hình ảnh banner</NameText>}>
          <CUploadSingle
            valuePropName="file"
            name="banner"
            disabled={!isHaveBrand}
            width="400px"
            height="100px"
            getValueFromEvent={handleChangeImg}
            initUrl={form.getFieldValue('banner')}
          />
        </CFormItem>
      </Form>
    </>
  );
}

BrandStep.propTypes = {
  form: PropTypes.any,
  onSetBodyUpdate: PropTypes.func,
};

export default BrandStep;
