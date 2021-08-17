import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { CheckOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => props.content};
  align-items: center;
  border-top: 1px solid #e0e0e0;
  margin-top: 16px;
  background: #ffffff;
  padding: 20px;
`;

const ArrowButton = styled(Button)`
  height: 50px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  svg {
    path {
      fill: ${props => (props.type === 'default' ? '#595959' : '#fff')};
    }
  }
`;

export function FooterStep({
  max,
  current,
  isChangeBody = false,
  isSubmitting,
  next,
  prev,
}) {
  return (
    <Wrapper
      content={isChangeBody && !(current === 0) ? 'flex-end' : 'space-between'}
    >
      {current > 0 ? (
        !isChangeBody && (
          <ArrowButton
            icon={<LeftOutlined />}
            type="default"
            onClick={() => prev()}
          >
            Quay lại
          </ArrowButton>
        )
      ) : (
        <Link to="/process/list">
          <ArrowButton
            icon={<LeftOutlined />}
            type="default"
            onClick={() => prev()}
          >
            Hủy thêm mới
          </ArrowButton>
        </Link>
      )}
      {current >= max ? (
        <ArrowButton
          loading={isSubmitting}
          icon={<CheckOutlined />}
          onClick={() => next()}
          type="primary"
        >
          Lưu lại
        </ArrowButton>
      ) : (
        <ArrowButton
          loading={isSubmitting}
          type="primary"
          onClick={() => next()}
        >
          {isChangeBody ? 'Lưu lại' : 'Tiếp theo'} <RightOutlined />
        </ArrowButton>
      )}
    </Wrapper>
  );
}

FooterStep.propTypes = {
  max: PropTypes.number,
  current: PropTypes.number,
  isSubmitting: PropTypes.bool,
  isChangeBody: PropTypes.bool,
  next: PropTypes.func,
  prev: PropTypes.func,
};

export default FooterStep;
