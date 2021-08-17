import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  TitleText,
  NormalText,
  Space as Spacing,
  Notification,
} from 'components';
import { Space } from 'antd';
import Slider from 'react-slick';

import { useDispatch, useSelector } from 'react-redux';
import { CategoryCard, CertificateCard } from 'containers/Farm/components';
import {
  rederSkeletonCertificate,
  rederSkeletonCategory,
} from 'containers/Farm/commons/renderUtils';

import { find as findCategory } from 'containers/HomePage/categorySlice';
import { find as findCertification } from 'containers/HomePage/certificationSlice';

import {
  category as categoryQuery,
  certification as certificationQuery,
} from 'containers/Farm/commons/query';

const DivRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
`;

const DeleteText = styled.span`
  font-weight: 500;
  font-size: ${props => props.theme.fontsizeBase};
  text-decoration-line: underline;
  color: #ff6347;
  cursor: pointer;
`;

const CSlider = styled(Slider)`
  height: auto;
  .slick-track {
    margin-left: 0;
  }
  width: 100%;
`;

const Div = styled.div``;

const settings = {
  dots: false,
  speed: 500,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const settingsBottom = {
  dots: false,
  speed: 500,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
};

const SelectionStep = ({ data, setData }) => {
  const dispatch = useDispatch();

  const categoryList = useSelector(state => state.category.list);
  const certificationList = useSelector(state => state.certification.list);

  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [isLoadingCertification, setIsLoadingCertification] = useState(false);

  const handleEditCertifications = id => {
    if (data.certificationIds.includes(id)) {
      const newArr = data.certificationIds.filter(item => item !== id);
      setData({ ...data, certificationIds: newArr });
    } else {
      const newArr = data.certificationIds.concat(id);
      setData({ ...data, certificationIds: newArr });
    }
  };

  const handleEditCategories = id => {
    if (data.categoryIds.includes(id)) {
      const newArr = data.categoryIds.filter(item => item !== id);
      setData({ ...data, categoryIds: newArr });
    } else {
      const newArr = data.categoryIds.concat(id);
      setData({ ...data, categoryIds: newArr });
    }
  };

  const initCategory = async () => {
    setIsLoadingCategory(true);
    try {
      const dataResult = await dispatch(findCategory(categoryQuery));
      unwrapResult(dataResult);
    } catch (error) {
      Notification('error', 'Tải loại sản phẩm thất bại', error.message);
    }
    setIsLoadingCategory(false);
  };

  const initCertification = async () => {
    setIsLoadingCertification(true);
    try {
      const dataResult = await dispatch(findCertification(certificationQuery));
      unwrapResult(dataResult);
    } catch (error) {
      Notification('error', 'Tải chứng chỉ thất bại', error.message);
    }
    setIsLoadingCertification(false);
  };

  useEffect(() => {
    initCategory();
    initCertification();
  }, []);

  return (
    <>
      <TitleText>Lựa chọn danh mục bán</TitleText>
      <Spacing height={12} />
      <NormalText>
        Vui lòng lựa chọ danh mục bạn muốn ben. Để có thể nâng cao chất lượng
        bán hàng
      </NormalText>
      <Spacing height={12} />
      <DivRow>
        <TitleText>Lựa chọn chứng chỉ</TitleText>
        <Space size="middle">
          <NormalText>
            Bạn chọn {data.certificationIds.length} chứng chỉ
          </NormalText>
          <DeleteText
            onClick={() => {
              setData({ ...data, certificationIds: [] });
            }}
          >
            Xóa tất cả
          </DeleteText>
        </Space>
      </DivRow>
      <Spacing height={12} />
      <DivRow>
        <CSlider {...settings}>
          {isLoadingCertification && rederSkeletonCertificate()}
          {certificationList.map(item => (
            <Div
              key={item.id}
              onKeyDown={() => handleEditCertifications(item.id)}
              onClick={() => handleEditCertifications(item.id)}
            >
              <CertificateCard
                name={item.name}
                logo={item.logo}
                active={data.certificationIds.includes(item.id)}
              />
            </Div>
          ))}
        </CSlider>
      </DivRow>
      <Spacing height={36} />
      <DivRow>
        <TitleText>Lựa chọn danh mục sản phẩm</TitleText>
        <Space size="middle">
          <NormalText>Bạn chọn {data.categoryIds.length} Danh mục</NormalText>
          <DeleteText
            onClick={() => {
              setData({ ...data, categoryIds: [] });
            }}
          >
            Xóa tất cả
          </DeleteText>
        </Space>
      </DivRow>
      <Spacing height={12} />
      <DivRow>
        <CSlider {...settingsBottom}>
          {isLoadingCategory && rederSkeletonCategory()}
          {categoryList.map(item => (
            <Div
              key={item.id}
              onKeyDown={() => handleEditCertifications(item.id)}
              onClick={() => handleEditCategories(item.id)}
            >
              <CategoryCard
                name={item.name}
                logo={item.urlThumbnail}
                active={data.categoryIds.includes(item.id)}
              />
            </Div>
          ))}
        </CSlider>
      </DivRow>
      <Spacing height={12} />
    </>
  );
};

SelectionStep.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
};

export default SelectionStep;
