import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Button } from 'antd';

import Space from 'components/Commons/Space';
import Column from 'components/Commons/Column';
import Row from 'components/Commons/Row';

const CModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;

    .ant-modal-header {
      .ant-modal-title {
        font-weight: 700;
      }
    }

    .ant-modal-footer {
      display: none;
    }
  }
`;

const Label = styled.span`
  color: ${props => props.theme.textColorSecondary};
`;

const Value = styled.span`
  color: ${props => props.theme.textColor};
`;

const WrapAction = styled.div`
  padding: 18px 0px 0px 0px;
  border-top: 1px solid #f1f1f1;
`;

const CButtonLink = styled(Button)`
  padding: 12px 0px;
  font-weight: 500;

  span {
    color: ${props => props.color};
  }

  &:hover {
    span {
      text-decoration: underline;
    }
  }
`;

const AcceptButton = styled(Button)`
  width: 108px;
  height: 42px;
`;

const ModelReviewMail = ({ visible, closeModal }) => (
  <CModal title="Thư ngỏ liên kêt" visible={visible} onCancel={closeModal}>
    <Column>
      <Label>Tên đối tượng:</Label>
      <Space height={12} />
      <Value>Nông Trại sạch Thủ Đức</Value>
    </Column>
    <Space height={24} />
    <Column>
      <Label>Số điện thoại:</Label>
      <Space height={12} />
      <Value>0923713535</Value>
    </Column>
    <Space height={24} />
    <Column>
      <Label>Giới thiệu:</Label>
      <Space height={12} />
      <Value>
        Theo bản tin 12h ngày 17/5 của Bộ Y tế, 28 ca mắc ghi nhận tại Bắc Giang
        (14), Điện Biên (7), Hà Nam (5), Lạng Sơn (2). Họ đều được phát hiện
        nhiễm nCoV trong khu cách ly, không phát hiện các ổ dịch mới. Bắc Giang
        ghi nhận 14 người mắc Covid-19, đều là F1 liên quan các khu công nghiệp
        Quang Châu, Vân Trung, Đình Trám, Song Khê - Nội Hoàng, Quế Võ.
      </Value>
    </Column>
    <Space height={24} />
    <WrapAction>
      <Row justifyContent="flex-end">
        <CButtonLink type="link" color="#F05540">
          Từ chối
        </CButtonLink>
        <Space width={24} />
        <CButtonLink type="link" color="#4276FE">
          Xem cửa hàng
        </CButtonLink>
        <Space width={24} />
        <AcceptButton type="primary">Chấp nhận</AcceptButton>
      </Row>
    </WrapAction>
  </CModal>
);

ModelReviewMail.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default ModelReviewMail;
