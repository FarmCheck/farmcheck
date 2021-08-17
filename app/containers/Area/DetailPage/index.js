import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';

import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { AimOutlined } from '@ant-design/icons';
import { Form, Tooltip, Spin, Space, Switch } from 'antd';

import location from 'public/static/location.json';
import { removeVietnameseTones } from 'commons/functionUtils';
import { parseUtils } from 'commons/parseUtils';

import {
  PageTitle,
  PageTitleBar,
  TextEditor,
  CUploadList,
  CSelect,
  NameText,
  Space as Spacing,
  Footer,
  CFormItem,
  Notification,
  InputText,
} from 'components';

import { areaTypeList } from 'containers/Area/commons/data';
import { find as findEmployee } from 'containers/Employee/employeeSlice';
import {
  employee as employeeQuery,
  areaBase,
} from 'containers/Area/commons/query';
import { findOne, update } from 'containers/Area/areaSlice';

import { FarmApi } from 'api/farm';

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 84px;
`;

const WrapperContentTitle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

// TODO: move into common data
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

const rules = [
  {
    field: 'any',
    conditions: [{ name: 'required', value: true }],
  },
];

export function AreaDetailPage({ match }) {
  const dispatch = useDispatch();

  const farmID = useSelector(state => state.farm.item.id);
  const employeeList = useSelector(state => state.employee.list);
  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHaveEmployee, setIsHaveEmployee] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const [bodyUpdate, setBodyUpdate] = useState({});
  const [countImg, setCountImg] = useState(
    (form.getFieldValue('medias') && form.getFieldValue('medias').length) || 0,
  );

  const handleSetBodyUpdate = value => {
    setBodyUpdate({ ...bodyUpdate, ...value });
  };

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
                handleSetBodyUpdate({ address: resultAddress });
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
            Notification('error', 'Không lấy được vị trí');
          });
      });
    } else {
      setIsLoadingAddress(false);
      Notification('error', 'Thiết bị không hỗ trợ định vị');
    }
  };

  const handleChangeImg = e => {
    if (Array.isArray(e)) {
      return e;
    }

    const { fileList } = e;
    if (Array.isArray(fileList)) {
      setCountImg(fileList.length);
    }

    return e && e.fileList;
  };

  const handleSubmit = async () => {
    if (Object.keys(bodyUpdate).length === 0) {
      Notification('info', 'Chưa có thay đổi nào');
      return;
    }

    Notification('info', 'Đang cập nhật vùng sản xuất');
    const locationInfo = form.getFieldsValue([
      'address',
      'longitude',
      'latitude',
    ]);
    form.validateFields().then(async () => {
      try {
        setIsSubmitting(true);

        const body = {
          ...bodyUpdate,
          ...locationInfo,
        };

        parseUtils(body, 'medias', 'images');
        parseUtils(body, 'type', 'number');

        Object.keys(body).forEach(e => {
          if (body[e] === undefined) {
            delete body[e];
          }
        });

        const actionResult = await dispatch(
          update({ id: match.params.id, body }),
        );

        unwrapResult(actionResult);

        Notification('success', 'Cập nhật vùng sản xuất thành công');
        setBodyUpdate({});
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        Notification('error', 'Cập nhật vùng sản xuất thất bại');
      }
    });
  };

  const initData = async () => {
    try {
      const actionResult = await dispatch(
        findOne({ id: match.params.id, option: areaBase }),
      );
      const { data } = unwrapResult(actionResult);

      if (data.employeeID) {
        setIsHaveEmployee(true);
      } else {
        delete data.employeeID;
        setIsHaveEmployee(false);
      }

      if (data.type === 0) {
        data.type = '0';
      }
      parseUtils(data, 'type', 'string');

      const medias = data.medias.map(e => ({ uid: e.id, url: e.urlThumbnail }));

      form.setFieldsValue({
        ...data,
        medias,
      });
    } catch (err) {
      Notification('error', 'Tải dữ liệu thất bại', err.message);
    }
  };

  const innitEmployeeData = () => {
    if (employeeList.length === 0) {
      dispatch(findEmployee({ ...employeeQuery, where: { farmID } }));
    } else {
      form.setFieldsValue({ employeeID: employeeList[0].id });
    }
  };

  useEffect(() => {
    innitEmployeeData();
  }, [employeeList]);

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <PageTitleBar
        title="Chỉnh sửa vùng sản xuất"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
          tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <WrapperContent>
        <WrapperContentTitle>
          <PageTitle
            subTitle="Thông tin vùng sản xuất"
            description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
          />
          <Form
            onValuesChange={handleSetBodyUpdate}
            form={form}
            style={{ marginTop: '20px' }}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 11 }}
            layout="horizontal"
            labelAlign="left"
          >
            <CFormItem
              name="name"
              label={<NameText>Tên vùng sản xuất</NameText>}
              rules={[
                {
                  required: true,
                  message: 'Bạn chưa nhập tên vùng sản xuất!',
                },
              ]}
            >
              <InputText
                style={{
                  border: '1px solid #d9d9d9',
                  fontSize: '15px !important',
                }}
                size="large"
              />
            </CFormItem>
            <CFormItem
              name="type"
              label={<NameText>Loại vùng sản xuất</NameText>}
            >
              <CSelect list={areaTypeList} placeHolder="Chọn loại vùng" />
            </CFormItem>
            <CFormItem name="address" label={<NameText>Địa chỉ</NameText>}>
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
            <CFormItem
              name="description"
              label={<NameText>Mô tả sản phẩm</NameText>}
            >
              <TextEditor
                onChange={value => {
                  form.setFieldsValue({ description: value });
                }}
              />
            </CFormItem>
            <Spacing height={42} />
            <PageTitle
              subTitle="Thiết lập quản lý"
              description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
            />
            <Spacing height={28} />
            <Space>
              <Switch
                checked={isHaveEmployee}
                onChange={() => setIsHaveEmployee(!isHaveEmployee)}
                style={{ marginRight: '12px' }}
              />
              <NameText>Thiết lập nhân viên quản lý</NameText>
            </Space>
            <Spacing height={24} />
            <CFormItem
              name="employeeID"
              label={<NameText>Người phụ trách</NameText>}
            >
              <CSelect
                disabled={!isHaveEmployee}
                list={employeeList}
                placeHolder="Chọn người phụ trách"
              />
            </CFormItem>
            <PageTitle
              subTitle="Hình ảnh"
              description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
            />
            <Spacing height={28} />
            <CFormItem
              name="medias"
              label={<NameText>Hình ảnh vùng sản xuất</NameText>}
            >
              <CUploadList
                valuePropName="fileList"
                name="medias"
                getValueFromEvent={handleChangeImg}
                count={countImg}
              />
            </CFormItem>
            <Spacing height={50} />
          </Form>
        </WrapperContentTitle>
      </WrapperContent>
      <Footer
        content={['Hủy chỉnh sửa', 'Lưu lại']}
        onSubmit={handleSubmit}
        urlExit="/area/list"
        isSubmitting={isSubmitting}
        src={bodyUpdate}
        rules={rules}
      />
    </>
  );
}

AreaDetailPage.propTypes = {
  match: PropTypes.object,
};

export default AreaDetailPage;
