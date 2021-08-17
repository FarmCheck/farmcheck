import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, Tooltip, Spin, Col, Row } from 'antd';
import {
  AimOutlined,
  CopyOutlined,
  ShareAltOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import QRCode from 'qrcode.react';
import { env } from 'env';

import {
  removeVietnameseTones,
  isVietnamesePhoneNumber,
  validateEmail,
} from 'commons/functionUtils';
import location from 'public/static/location.json';

import {
  NameText,
  CFormItem,
  InputText,
  PageTitle,
  CButton,
  Space as Spacing,
  MiniText,
  Notification,
} from 'components';
import { FarmApi } from 'api/farm';

const ActionQR = styled.div`
  width: ${props => (props.width ? `${props.width}px` : 'auto')};
  height: auto;
  display: flex;
  flex-direction: column;
  margin-left: ${props => (props.left ? props.left : '0')}px;
`;

const CQRCode = styled(QRCode)`
  width: 266px !important;
  height: 266px !important;
`;

const DivRow = styled.div`
  display: flex;
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

export function ConTactStep({ form, onSetBodyUpdate }) {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

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
      <PageTitle
        subTitle="Thông tin liên lạc"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
        tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <Form
        form={form}
        style={{ width: '100%' }}
        layout="vertical"
        labelAlign="left"
        onValuesChange={onSetBodyUpdate}
      >
        <Row style={{ marginTop: '20px' }}>
          <Col xs={24} sm={20} md={16} lg={16} xl={10}>
            <CFormItem label={<NameText>Mã QR quản lý nội bộ</NameText>}>
              <DivRow>
                <CQRCode
                  value={`${env.farmhub.webApp}/portal/${form.getFieldValue(
                    'id',
                  )}`}
                />
                <ActionQR left={12}>
                  <CButton
                    type="primary"
                    icon={<CopyOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    Sao chép{' '}
                  </CButton>
                  <Spacing height={18} />
                  <CButton
                    type="primary"
                    icon={<ShareAltOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    Chia sẻ{' '}
                  </CButton>
                  <Spacing height={18} />
                  <CButton
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    Tra cứu{' '}
                  </CButton>
                </ActionQR>
              </DivRow>
            </CFormItem>
            <CFormItem name="barcode" label={<NameText>Mã liên kết</NameText>}>
              <DivRow>
                <ActionQR width={266}>
                  <InputText
                    defaultValue="https://farmhub.asia/"
                    size="large"
                    style={{ height: 50 }}
                  />
                  <Spacing height={18} />
                  <MiniText>
                    Tra cứu hoặc sao chép mã liên kết để chia sẻ với bạn bè và
                    người thân.
                  </MiniText>
                </ActionQR>

                <ActionQR left={12}>
                  <CButton
                    type="primary"
                    icon={<ShareAltOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    Sao chép{' '}
                  </CButton>
                  <Spacing height={18} />
                  <CButton
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    Tra cứu{' '}
                  </CButton>
                </ActionQR>
              </DivRow>
            </CFormItem>
          </Col>
          <Col xs={0} sm={4} md={8} lg={0} xl={2} />
          <Col xs={24} sm={20} md={16} lg={16} xl={10}>
            <CFormItem
              name="email"
              label={<NameText>Email đăng nhập:</NameText>}
              help={
                isValidEmail ? null : (
                  <span style={{ color: 'red' }}>Email không hợp lệ!</span>
                )
              }
              rules={[
                {
                  required: true,
                  message: 'Bạn chưa nhập email!',
                },
              ]}
            >
              <InputText onChange={handleVerifyEmail} size="large" />
            </CFormItem>
            <CFormItem
              name="phoneNumber"
              label={<NameText>Số điện thoại:</NameText>}
              help={
                isValidPhoneNumber ? null : (
                  <span style={{ color: 'red' }}>
                    Số điện thoại không hợp lệ!
                  </span>
                )
              }
              rules={[
                {
                  required: true,
                  message: 'Bạn chưa nhập số điện thoại!',
                },
              ]}
            >
              <InputText onChange={handleVerifyPhone} size="large" />
            </CFormItem>
            <CFormItem
              name="website"
              label={<NameText>Địa chỉ Website:</NameText>}
            >
              <InputText size="large" />
            </CFormItem>
            <CFormItem name="address" label={<NameText>Địa chỉ:</NameText>}>
              <InputText
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
            </CFormItem>
          </Col>
          <Col xs={0} sm={4} md={8} lg={8} xl={2} />
        </Row>
      </Form>
    </>
  );
}

ConTactStep.propTypes = {
  form: PropTypes.object,
  onSetBodyUpdate: PropTypes.func,
};

export default ConTactStep;
