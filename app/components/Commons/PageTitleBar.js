import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import CButton from 'components/Button/CButton';
import PageTitle from 'components/Commons/PageTitle';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  heigh: auto;
  background: #ffffff;
  border-bottom: 1px solid #f1f1f1;
  padding: 24px;
  border-radius: 6px;
  margin-bottom: 24px;
`;

const PageTitleBar = ({
  title,
  subTitle,
  description,
  url,
  RedirectButton,
}) => (
  <Wrapper>
    <PageTitle title={title} subTitle={subTitle} description={description} />
    {url && (
      <Link to={url}>
        <CButton size="large" type="primary" icon={<PlusOutlined />}>
          Thêm mới
        </CButton>
      </Link>
    )}
    {RedirectButton && <RedirectButton />}
  </Wrapper>
);

PageTitleBar.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  RedirectButton: PropTypes.func,
};

export default PageTitleBar;
