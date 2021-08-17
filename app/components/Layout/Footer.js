import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

import CButton from 'components/Button/CButton';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.1);
  background: #fff;
  bottom: 0;
  left: 320px;
`;

const CSpace = styled(Space)`
  position: fixed;
  right: 24px;
  bottom: 15px;
`;

const ExitButton = styled(Button)`
  height: 50px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
`;

export function Footer({
  onSubmit,
  src,
  content = ['', ''],
  rules = [],
  urlExit = '',
  isSubmitting = false,
}) {
  return (
    <Wrapper>
      <CSpace size="middle">
        <ExitButton type="text" size="large">
          <Link to={urlExit}>{content[0]}</Link>
        </ExitButton>
        <CButton
          src={src}
          onClick={onSubmit}
          type="primary"
          rules={rules}
          loading={isSubmitting}
        >
          {content[1]}
        </CButton>
      </CSpace>
    </Wrapper>
  );
}

Footer.propTypes = {
  onSubmit: PropTypes.func,
  src: PropTypes.object,
  content: PropTypes.array,
  rules: PropTypes.array,
  urlExit: PropTypes.string,
  isSubmitting: PropTypes.bool,
};

export default Footer;
