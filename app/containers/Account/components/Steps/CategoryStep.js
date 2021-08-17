import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

const Wrapper = styled.div`
  width: 600px;
`;

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

const CategoryStep = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState({
    certificationIds: [],
    categoryIds: [],
  });

  const categoryList = useSelector(state => state.category.list);
  const certificationList = useSelector(state => state.certification.list);

  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [isLoadingCertification, setIsLoadingCertification] = useState(false);

  const handleEditCertifications = id => {
    if (selectedItem.certificationIds.includes(id)) {
      const newArr = selectedItem.certificationIds.filter(item => item !== id);
      setSelectedItem({ ...selectedItem, certificationIds: newArr });
    } else {
      const newArr = selectedItem.certificationIds.concat(id);
      setSelectedItem({ ...selectedItem, certificationIds: newArr });
    }
  };

  const handleEditCategories = id => {
    if (selectedItem.categoryIds.includes(id)) {
      const newArr = selectedItem.categoryIds.filter(item => item !== id);
      setSelectedItem({ ...selectedItem, categoryIds: newArr });
    } else {
      const newArr = selectedItem.categoryIds.concat(id);
      setSelectedItem({ ...selectedItem, categoryIds: newArr });
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
    <Wrapper>
      <Spacing height={12} />
      <DivRow>
        <TitleText>Lựa chọn chứng chỉ</TitleText>
        <Space size="middle">
          <NormalText>
            Bạn chọn {selectedItem.certificationIds.length} chứng chỉ
          </NormalText>
          <DeleteText
            onClick={() => {
              setSelectedItem({ ...selectedItem, certificationIds: [] });
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
                active={selectedItem.certificationIds.includes(item.id)}
              />
            </Div>
          ))}
        </CSlider>
      </DivRow>
      <Spacing height={36} />
      <DivRow>
        <TitleText>Lựa chọn danh mục sản phẩm</TitleText>
        <Space size="middle">
          <NormalText>
            Bạn chọn {selectedItem.categoryIds.length} Danh mục
          </NormalText>
          <DeleteText
            onClick={() => {
              setSelectedItem({ ...selectedItem, categoryIds: [] });
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
                active={selectedItem.categoryIds.includes(item.id)}
              />
            </Div>
          ))}
        </CSlider>
      </DivRow>
      <Spacing height={24} />
    </Wrapper>
  );
};

export default CategoryStep;
