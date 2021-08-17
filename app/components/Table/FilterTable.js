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
  width: auto;
  height: 44px;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding-left: 12px;
`;

const CustomSelect = styled(Select)`
  width: 220px;
  height: 42px;

  .ant-select-selector {
    height: 42px !important;
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

const FilterTable = ({ bodySort, setBodySort, isNoTotal }) => {
  const setIsRise = value => {
    setBodySort({
      ...bodySort,
      value,
    });
  };

  const handleOption = value => {
    if (bodySort) {
      setBodySort({
        ...bodySort,
        name: value,
      });
    }
  };

  return (
    <Wrapper>
      {bodySort && bodySort.value === 1 ? (
        <SortDescendingOutlined
          onClick={() => setIsRise(-1)}
          style={{ color: '#39B54A', fontSize: 18 }}
        />
      ) : (
        <SortAscendingOutlined
          onClick={() => setIsRise(1)}
          style={{ color: 'red', fontSize: 18 }}
        />
      )}
      <CustomSelect
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        suffixIcon={<CaretDownOutlined />}
        size="large"
        style={{ height: '100%' }}
        defaultValue="createdAt"
        onChange={handleOption}
      >
        <Option value="createdAt">Sắp xếp theo ngày tạo</Option>
        <Option value="name">Sắp xếp theo Alphabet</Option>
        {!isNoTotal && (
          <Option value="productObjectsTotal">Sắp xếp theo số lượng</Option>
        )}
      </CustomSelect>
    </Wrapper>
  );
};

FilterTable.propTypes = {
  setBodySort: PropTypes.func,
  bodySort: PropTypes.object,
  isNoTotal: PropTypes.bool,
};

export default FilterTable;
