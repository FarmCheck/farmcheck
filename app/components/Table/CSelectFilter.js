import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

const { Option } = Select;

const Wrapper = styled(Select)`
  min-height: 44px;
  font-size: ${props => props.theme.fontsizeBase} !important;

  .ant-select-selector {
    display: flex;
    align-items: center;
    min-height: 44px;
    border-color: #d9d9d9 !important;
  }
  .ant-form-item-has-error {
    border-color: #d9d9d9 !important;
  }
`;

const CSelectFilter = ({
  value,
  onChange,
  placeholder,
  list,
  width = 220,
  disabled = false,
}) => (
  <Wrapper
    style={{ width }}
    showSearch
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    suffixIcon={<CaretDownOutlined />}
    value={value}
    size="large"
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
  >
    {list.length !== 0 &&
      list.map(item => (
        <Option key={item.key} value={item.value}>
          {item.name}
        </Option>
      ))}
  </Wrapper>
);

CSelectFilter.propTypes = {
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  list: PropTypes.array,
  width: PropTypes.number,
  disabled: PropTypes.bool,
};

export default CSelectFilter;
