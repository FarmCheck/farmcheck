import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import Slider from 'react-slick';

import {
  NameText,
  CFormItem,
  PageTitle,
  NormalText,
  CUploadSingle,
  CUploadAvatar,
} from 'components';

import { find as findOrganization } from 'containers/HomePage/organizationSlice';
import { organization as organizationQuery } from 'containers/Farm/commons/query';

import {
  OrganizationCard,
  CButtonAddOrganization,
} from 'containers/Farm/components';

const MinText = styled.div`
  font-weight: 500;
  font-size: 10px;
  color: #8c8c8c;
  margin-bottom: 12px;
`;

const WrapperSlider = styled.div`
  display: flex;
  width: 600px;
  height: auto;
`;
const CSlider = styled(Slider)`
  height: auto;
  .slick-track {
    margin-left: 0;
  }
  width: 100%;
`;

const settings = {
  dots: false,
  speed: 500,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
};

export function BrandStep({ form, onSetBodyUpdate }) {
  const dispatch = useDispatch();
  // const height = window.innerHeight;
  const organizationList = useSelector(state => state.organization.list);

  const handleChangeBanner = e => e && e.file;
  const handleChangeAvatar = e => e && e.file;

  const initDataOrganization = () => {
    if (organizationList.length === 0) {
      dispatch(findOrganization(organizationQuery));
    }
  };

  useEffect(() => {
    initDataOrganization();
  }, []);

  return (
    <>
      <PageTitle
        subTitle="Thông tin thương hiệu"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
        tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <Form
        style={{ marginTop: '20px', width: '100%' }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 11 }}
        layout="horizontal"
        labelAlign="left"
        onValuesChange={onSetBodyUpdate}
      >
        <CFormItem label={<NameText>Logo nông trại</NameText>}>
          <CUploadAvatar
            valuePropName="file"
            name="logo"
            getValueFromEvent={handleChangeAvatar}
            initUrl={
              form.getFieldValue('logo') === null
                ? form.getFieldValue('name')[0]
                : form.getFieldValue('logo')
            }
          />
        </CFormItem>
        <CFormItem label={<NameText>Hình ảnh tiêu đề</NameText>}>
          <CUploadSingle
            valuePropName="file"
            name="banner"
            width="560px"
            height="231px"
            getValueFromEvent={handleChangeBanner}
            initUrl={form.getFieldValue('banner')}
          />
          <MinText>
            Hiển thị ở đầu trang dành cho trang giới thiệu của bạn
          </MinText>
          <NormalText>
            JPEG hoặc PNG 24-bit (không dùng ảnh có nền trong suốt)
          </NormalText>
        </CFormItem>
        <CFormItem label={<NameText>Danh sách chứng nhận</NameText>}>
          <WrapperSlider>
            <CButtonAddOrganization
              width={100}
              height={100}
              list={organizationList}
            />
            <CSlider {...settings}>
              {organizationList.map(item => (
                <OrganizationCard
                  key={item.id}
                  name={item.name}
                  logo={item.logo}
                />
              ))}
            </CSlider>
          </WrapperSlider>
        </CFormItem>
      </Form>
    </>
  );
}

BrandStep.propTypes = {
  form: PropTypes.object,
  onSetBodyUpdate: PropTypes.func,
};

export default BrandStep;
