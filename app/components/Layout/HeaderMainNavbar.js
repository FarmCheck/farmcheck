import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Input, Dropdown, Menu, Badge, Space } from 'antd';
import styled from 'styled-components';
import {
  CaretDownOutlined,
  BellOutlined,
  SearchOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';

import Spacing from 'components/Commons/Space';
import NameText from 'components/Text/NameText';
import MiniText from 'components/Text/MiniText';

const { Header } = Layout;

const Wrapper = styled(Header)`
  display: flex;
  height: 98px;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
  background: #ffffff;
`;

const CInput = styled(Input)`
  border-radius: 6px;
  box-shadow: none;
  width: 420px !important;
  min-height: 50px;
`;

const Avatar = styled.img`
  width: 52px;
  height: 52px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
  border-radius: 50%;
  margin-right: 12px;
`;

const DivRow = styled.div`
  display: flex;
  width: auto;
  align-items: center;
`;

const Contact = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  background: #f5f5f5;
  border-radius: 50%;
`;

const CBadge = styled(Badge)`
  position: absolute !important;
  top: 0px;
  right: -12px;
`;

const CMenuItem = styled(Menu.Item)`
  padding: 12px 24px !important;
  font-weight: 500 !important;
`;

const CMenuItemHeader = styled(Menu.Item)`
  padding: 24px !important;
  font-weight: 500 !important;
  border-bottom: 1px solid #f1f1f1;
`;

const WrapperAvatar = styled.div`
  width: auto;
  height: 52px;
  display: flex;
  align-items: center;
  .name-text {
    font-weight: 700;
    font-size: ${props => props.theme.fontsizeBase};
    line-height: 22px !important;
    margin-right: 12px;
  }
`;

const InfoAvatar = styled.div`
  display: flex;
  width: auto;
  height: 52px;
  flex-direction: column;
  justify-content: center;
`;

const HeaderMainNavbar = ({ user, onLogoutUser, AccountModal }) => {
  const menu = (
    <Menu style={{ width: 300, paddingBottom: 24 }}>
      <CMenuItemHeader key="0">
        <Space direction="vertical">
          <NameText line="1">{user.fullName}</NameText>
          <MiniText>{user.email}</MiniText>
        </Space>
      </CMenuItemHeader>
      <CMenuItem key="1" icon={<UserOutlined />}>
        Thông tin của tôi
      </CMenuItem>
      <CMenuItem key="2" onClick={onLogoutUser} icon={<LogoutOutlined />}>
        Thoát tài khoản
      </CMenuItem>
    </Menu>
  );

  return (
    <Wrapper>
      <DivRow>
        <AccountModal />
        <Spacing width={12} />
        <CInput
          size="large"
          placeholder="Tìm kiếm từ khóa"
          prefix={<SearchOutlined />}
        />
      </DivRow>
      <DivRow>
        <Contact>
          <BellOutlined style={{ fontSize: '20px' }} />
          <CBadge
            className="site-badge-count-109"
            count={99}
            style={{ backgroundColor: '#52c41a' }}
          />
        </Contact>

        <Spacing width={38} />
        <Dropdown
          trigger={['click']}
          placement="bottomLeft"
          overlay={menu}
          icon={<UserOutlined />}
        >
          <WrapperAvatar>
            <Avatar src={user.avatar} />
            <InfoAvatar>
              <MiniText>Tài khoản</MiniText>
              <DivRow>
                <span className="name-text">{user.fullName}</span>
                <CaretDownOutlined />
              </DivRow>
            </InfoAvatar>
          </WrapperAvatar>
        </Dropdown>
      </DivRow>
    </Wrapper>
  );
};

HeaderMainNavbar.propTypes = {
  user: PropTypes.object,
  onLogoutUser: PropTypes.func,
  AccountModal: PropTypes.any,
};

export default HeaderMainNavbar;
