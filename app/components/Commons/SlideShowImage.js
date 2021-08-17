import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Wrap = styled.div`
  width: ${props => props.width}px;
  position: relative;

  .prev-button,
  .next-button {
    opacity: 0;

    transition: opacity 0.2s;
  }

  &:hover {
    .prev-button,
    .next-button {
      opacity: 1;
    }
  }
`;

const WrapSlideShow = styled.div`
  width: ${props => props.width}px;

  box-sizing: content-box;

  position: relative;

  overflow: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StylePrev = css`
  top: 0;
  left: 0;
  transform: translate(-50%, 0);
`;

const StyleNext = css`
  top: 0;
  right: 0;
  transform: translate(50%, 0);
`;

const WrapButton = styled.div`
  width: 48px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  z-index: 10;

  ${props => (props.type === 'PREV' ? StylePrev : StyleNext)}
`;

const SlideShowImage = ({ children, spacing, width }) => {
  const refSlide = useRef(null);
  const refPrev = useRef(null);
  const refNext = useRef(null);

  useEffect(() => {
    if (refPrev.current && refNext.current && refSlide.current) {
      if (refSlide.current && refSlide.current.scrollWidth <= width) {
        refNext.current.style.display = 'none';
      }

      refPrev.current.style.display = 'none';
    }
  });

  const nextSlide = () => {
    if (
      refNext.current &&
      refSlide.current &&
      refSlide.current.scrollLeft + 2 * width + 12 + spacing >=
        refSlide.current.scrollWidth
    ) {
      refNext.current.style.display = 'none';
    }

    if (refSlide.current) {
      refSlide.current.scroll({
        top: 0,
        left: refSlide.current.scrollLeft + width + spacing,
        behavior: 'smooth',
      });
    }

    if (refPrev.current) {
      refPrev.current.style.display = 'flex';
    }
  };

  const prevSlide = () => {
    if (
      refPrev.current &&
      refSlide.current &&
      refSlide.current.scrollLeft - (width + spacing) <= 0
    ) {
      refPrev.current.style.display = 'none';
    }

    if (refSlide.current) {
      refSlide.current.scroll({
        top: 0,
        left: refSlide.current.scrollLeft - (width + spacing),
        behavior: 'smooth',
      });
    }

    if (refNext.current) {
      refNext.current.style.display = 'flex';
    }
  };

  return (
    <Wrap width={width}>
      <WrapSlideShow ref={refSlide} width={width}>
        {children}
      </WrapSlideShow>
      <WrapButton
        className="prev-button"
        ref={refPrev}
        type="PREV"
        onClick={prevSlide}
      >
        <Button type="default" shape="circle" icon={<LeftOutlined />} />
      </WrapButton>
      <WrapButton
        className="next-button"
        ref={refNext}
        type="NEXT"
        onClick={nextSlide}
      >
        <Button type="default" shape="circle" icon={<RightOutlined />} />
      </WrapButton>
    </Wrap>
  );
};

SlideShowImage.propTypes = {
  children: PropTypes.any,
  spacing: PropTypes.number,
  width: PropTypes.number,
};

export default SlideShowImage;
