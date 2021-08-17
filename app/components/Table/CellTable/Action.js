import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import ActionButton from 'components/Button/ActionButton';

import { CaretDownOutlined } from '@ant-design/icons';

const CMenuItem = styled(Menu.Item)`
  padding: 12px 24px !important;
  font-weight: 500 !important;
`;

const TableAction = ({ id, name, remove = () => {} }) => {
  const menu = () => (
    <Menu>
      <CMenuItem key="1">
        <Link to={`/${name}/${id}/detail`}>Xem chi tiết</Link>
      </CMenuItem>
      <CMenuItem key="2">
        <Link to={`/${name}/${id}/detail`}>Chỉnh sửa</Link>
      </CMenuItem>
      <CMenuItem key="3" onClick={() => remove(id)}>
        Ẩn sản phẩm
      </CMenuItem>
    </Menu>
  );

  return (
    <Dropdown trigger={['click']} overlay={menu()} placement="bottomRight">
      <ActionButton>
        Lựa chọn <CaretDownOutlined />
      </ActionButton>
    </Dropdown>
  );
};

TableAction.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  remove: PropTypes.func,
};

export default TableAction;
