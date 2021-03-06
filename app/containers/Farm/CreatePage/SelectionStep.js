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
      Notification('error', 'T???i lo???i s???n ph???m th???t b???i', error.message);
    }
    setIsLoadingCategory(false);
  };

  const initCertification = async () => {
    setIsLoadingCertification(true);
    try {
      const dataResult = await dispatch(findCertification(certificationQuery));
      unwrapResult(dataResult);
    } catch (error) {
      Notification('error', 'T???i ch???ng ch??? th???t b???i', error.message);
    }
    setIsLoadingCertification(false);
  };

  useEffect(() => {
    initCategory();
    initCertification();
  }, []);

  return (
    <>
      <TitleText>L???a ch???n danh m???c b??n</TitleText>
      <Spacing height={12} />
      <NormalText>
        Vui l??ng l???a ch??? danh m???c b???n mu???n ben. ????? c?? th??? n??ng cao ch???t l?????ng
        b??n h??ng
      </NormalText>
      <Spacing height={12} />
      <DivRow>
        <TitleText>L???a ch???n ch???ng ch???</TitleText>
        <Space size="middle">
          <NormalText>
            B???n ch???n {data.certificationIds.length} ch???ng ch???
          </NormalText>
          <DeleteText
            onClick={() => {
              setData({ ...data, certificationIds: [] });
            }}
          >
            X??a t???t c???
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
        <TitleText>L???a ch???n danh m???c s???n ph???m</TitleText>
        <Space size="middle">
          <NormalText>B???n ch???n {data.categoryIds.length} Danh m???c</NormalText>
          <DeleteText
            onClick={() => {
              setData({ ...data, categoryIds: [] });
            }}
          >
            X??a t???t c???
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
