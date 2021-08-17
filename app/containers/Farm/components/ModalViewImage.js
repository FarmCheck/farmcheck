import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import {
  Space as Spacing,
  TitleText,
  SlideShowImage,
  NormalText,
  NameText,
} from 'components';

const CModal = styled(Modal)`
  width: 100vw !important;
  max-width: 100vw !important;
  top: 0px !important;
  padding: 0px !important;

  .ant-modal-content {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);

    border-radius: 0px;

    .ant-modal-header {
      display: none;
    }

    .ant-modal-body {
      height: 100%;
      padding: 0px;

      display: flex;
    }

    .ant-modal-footer {
      display: none;
    }
  }
`;

const WrapLeft = styled.div`
  width: calc(100vw - 420px);
  height: 100%;

  padding: 0px 24px;
`;

const WrapListImage = styled.div`
  padding: 24px;

  display: flex;
  justify-content: center;
`;

const ImageActive = styled.img`
  margin-top: 20px;
  width: 100%;
  height: calc(100vh - 164px);

  object-fit: scale-down;
`;

const WrapImage = styled.div`
  width: 120px;
  height: 96px;
  background: blue;
  border-radius: 6px;
  margin-right: 12px;

  ${props =>
    props.selected ? `box-shadow: 0px 2px 4px #CCC;` : 'box-shadow: none;'}

  flex-shrink: 0;

  object-fit: cover;
  position: relative;

  cursor: pointer;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: ${props =>
      props.selected ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.2)'};

    border-radius: 6px;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

const ImageItem = styled.img`
  width: 120px;
  height: 96px;

  border-radius: 6px;
`;

const WrapRight = styled.div`
  width: 420px;
  height: 100%;
  background: #fff;
`;

const WrapContent = styled.div`
  height: calc(100vh - 50px);
  overflow: auto;
  padding: 18px;
`;

const Row = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  flex-wrap: nowrap;
`;

const ModalViewImage = ({ closeModel, visible, image, imageList }) => (
  <CModal title="Basic Modal" visible={visible} onCancel={closeModel}>
    <WrapLeft>
      <ImageActive src={image} />
      <WrapListImage>
        <SlideShowImage spacing={12} width={516}>
          <Row>
            {imageList.map(item => (
              <div key={item.src}>
                <WrapImage>
                  <ImageItem src={item.src} />
                </WrapImage>
              </div>
            ))}
          </Row>
        </SlideShowImage>
      </WrapListImage>
    </WrapLeft>
    <WrapRight>
      <Spacing height={14} />
      <Row>
        <Spacing width={18} />
        <TitleText>Ảnh thanh long ra hoa</TitleText>
      </Row>
      <Spacing height={12} />
      <WrapContent>
        <Row>
          <NameText>Ngày tạo:</NameText>
        </Row>
        <Row>
          <NormalText>12/12/2012</NormalText>
        </Row>
        <Spacing height="24" />
        <Row>
          <NameText>Vị trí:</NameText>
        </Row>
        <Row>
          <NormalText>2a/36 Bạch Đằng, Tân Bình, TP Hồ Chí Minh</NormalText>
        </Row>
        <Spacing height="24" />
        <Row>
          <NameText>Chú thích:</NameText>
        </Row>
        <Row>
          <NormalText>
            Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
            tưởng về khả năng khống chế dịch của Việt Nam
          </NormalText>
        </Row>
      </WrapContent>
    </WrapRight>
  </CModal>
);

ModalViewImage.propTypes = {
  closeModel: PropTypes.func,
  visible: PropTypes.bool,
  image: PropTypes.string,
  imageList: PropTypes.array,
};

export default ModalViewImage;
