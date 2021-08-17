import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Space, Row, Col } from 'antd';
import Gallery from 'react-photo-gallery';

import { Space as Spacing, NameText, PageTitle, NormalText } from 'components';

import {
  CButtonAddProduction,
  ProductionCard,
  ModalViewImage,
  CButtonAddImage,
} from 'containers/Farm/components';

const WrapperContent = styled.div`
  display: flex;
  width: 1000px;
  height: auto;
  flex-direction: column;
`;

const BreadcrumbText = styled.div`
  color: ${props => props.theme.textColorSecondary};
  font-size: ${props => props.theme.fontsizeBase};
  line-height: 22px;
  word-break: break-word;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`;

const DivRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const photos = [
  {
    src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
    width: 4,
    height: 3,
  },
];

const GalleryStep = () => {
  const [imgs, setImgs] = useState(photos);
  const [isImageViewer, setIsImageViewer] = useState(false);

  const [currentImage, setCurrentImage] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOpenLightbox = useCallback((event, { photo, index }) => {  //eslint-disable-line
    setCurrentImage(photo.src);
    handleShowModal();
  }, []);

  const handleCreateImage = values => {
    const img = new Image();
    img.onload = function() {
      const newImg = {
        src: values.image,
        width: this.width, //eslint-disable-line
        height: this.height, //eslint-disable-line
      };
      const newImgs = imgs.concat(newImg);
      setImgs(newImgs);
    };
    img.src = values.image;
  };

  return (
    <>
      <PageTitle
        subTitle="Bộ sưu tập hình ảnh nông trại"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
                tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <Spacing height={24} />
      {!isImageViewer && (
        <WrapperContent>
          <NameText>Danh sách bộ sưu tập: </NameText>
          <Spacing height={36} />
          <Row gutter={[8, 8]}>
            <Col span={6}>
              <CButtonAddProduction />
            </Col>
            <Col onClick={() => setIsImageViewer(true)} span={6}>
              <ProductionCard
                name="Bộ sưu tập thanh long"
                logo="https://source.unsplash.com/NQSWvyVRIJk/800x599"
              />
            </Col>
            <Col span={6}>
              <ProductionCard
                name="Bộ sưu tập thanh long"
                logo="https://source.unsplash.com/NQSWvyVRIJk/800x599"
              />
            </Col>
            <Col span={6}>
              <ProductionCard
                name="Bộ sưu tập thanh long"
                logo="https://source.unsplash.com/I1ASdgphUH4/800x599"
              />
            </Col>
            <Col span={6}>
              <ProductionCard
                name="Bộ sưu tập thanh long"
                logo="https://source.unsplash.com/I1ASdgphUH4/800x599"
              />
            </Col>
            <Col span={6}>
              <ProductionCard
                name="Bộ sưu tập thanh long"
                logo="https://source.unsplash.com/I1ASdgphUH4/800x599"
              />
            </Col>

            <Col span={6}>
              <ProductionCard
                name="Bộ sưu tập thanh long"
                logo="https://source.unsplash.com/I1ASdgphUH4/800x599"
              />
            </Col>
            <Col span={6}>
              <ProductionCard
                name="Bộ sưu tập thanh long"
                logo="https://source.unsplash.com/I1ASdgphUH4/800x599"
              />
            </Col>
            <Col span={6}>
              <ProductionCard
                name="Bộ sưu tập thanh long"
                logo="https://source.unsplash.com/I1ASdgphUH4/800x599"
              />
            </Col>
            <Col span={6}>
              <ProductionCard
                name="Bộ sưu tập thanh long"
                logo="https://source.unsplash.com/I1ASdgphUH4/800x599"
              />
            </Col>
          </Row>
        </WrapperContent>
      )}

      {isImageViewer && (
        <WrapperContent>
          <DivRow>
            <Space>
              <BreadcrumbText onClick={() => setIsImageViewer(false)}>
                Danh sách bộ sưu tập
              </BreadcrumbText>
              <NormalText>{'>'}</NormalText>
              <NameText>Bộ sưu tập thanh long</NameText>
            </Space>
            <CButtonAddImage onCreateImage={handleCreateImage} />
            {/* <Upload {...propsUpload}>
              <CButton
                type="primary"
                loading={isLoadingUpload}
                icon={<UploadOutlined />}
              >
                Upload hình ảnh
              </CButton>
            </Upload> */}
          </DivRow>
          <Spacing height={36} />
          <div>
            <Gallery photos={imgs} onClick={handleOpenLightbox} />
            <ModalViewImage
              visible={isModalVisible}
              closeModel={handleCancel}
              image={currentImage}
              imageList={imgs}
            />
          </div>
        </WrapperContent>
      )}
    </>
  );
};

export default GalleryStep;
