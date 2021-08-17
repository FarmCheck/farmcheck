import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

const Wrapper = styled(Input)`
  height: 44px;
  background: #fafafa !important;

  .ant-input {
    background: #fafafa;

    &::placeholder {
      font-size: ${props => props.theme.fontsizeBase} !important;
      color: #8c8c8c;
    }
  }
`;

const SearchTable = ({ placeholder, onChange }) => (
  <Wrapper
    style={{ width: 330 }}
    onPressEnter={onChange}
    size="large"
    placeholder={placeholder}
    prefix={<SearchOutlined />}
  />
);

SearchTable.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchTable;
