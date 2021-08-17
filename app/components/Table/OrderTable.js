import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import {
  CaretDownOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 210px;
  height: 44px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding-left: 12px;
`;

const CSelect = styled(Select)`
  width: 220px;
  height: 100%;

  .ant-select-selector {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    .ant-select-selection-item {
      font-size: ${props => props.theme.fontsizeBase};
      font-weight: 600;
      color: ${props => props.theme.primaryColor} !important;
      line-height: 42px !important;
    }
    &:active {
      outline: none !important;
      box-shadow: none !important;
      border: 0 !important;
    }
  }
`;

const OrderTable = ({ value, list, onChange }) => (
  <Wrapper>
    {value && value.value === 1 ? (
      <SortDescendingOutlined
        onClick={() =>
          onChange({
            ...value,
            value: -1,
          })
        }
        style={{ color: '#39B54A', fontSize: 18 }}
      />
    ) : (
      <SortAscendingOutlined
        onClick={() =>
          onChange({
            ...value,
            value: 1,
          })
        }
        style={{ color: 'red', fontSize: 18 }}
      />
    )}
    <CSelect
      showSearch
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      suffixIcon={<CaretDownOutlined />}
      size="large"
      value={value && value.name}
      onChange={e =>
        onChange({
          ...value,
          name: e,
        })
      }
    >
      {list.map(item => (
        <Option key={item.key} value={item.value}>
          {item.name}
        </Option>
      ))}
    </CSelect>
  </Wrapper>
);
OrderTable.propTypes = {
  value: PropTypes.any,
  list: PropTypes.array,
  onChange: PropTypes.func,
};

export default OrderTable;
