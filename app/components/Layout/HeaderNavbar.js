import PropTypes from 'prop-types';
import React from 'react';
import { env } from 'env';
import { Button, Dropdown, Menu, Space } from 'antd';
import {
  CaretDownOutlined,
  HomeFilled,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';

import logo from 'images/logo.png';

import LogoText from 'components/Text/LogoText';
import Spacing from 'components/Commons/Space';

import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 84px;
  top: 0px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  padding: 0px 64px;
`;

const LogoBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
`;

const Logo = styled.img`
  width: 52px;
  height: 52px;
`;

const WrapperText = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  flex-direction: column;
  justify-content: center;
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

const MiniText = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #8c8c8c;
  line-height: 22px !important;
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

const Avatar = styled.img`
  width: 52px;
  height: 52px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
  border-radius: 50%;
  margin-right: 12px;
`;

const InfoAvatar = styled.div`
  display: flex;
  width: auto;
  height: 52px;
  flex-direction: column;
  justify-content: center;
`;

const DivRow = styled.div`
  display: flex;
  width: auto;
  align-items: center;
`;

const NameText = styled.span`
  font-weight: 700;
  font-size: 16px;
`;

const ButtonLink = styled(Button)`
  font-size: ${props => props.theme.fontsizeBase} !important;
  font-weight: 700 !important;
  color: #39b54a !important;
`;

const HeaderNavbar = ({ user, onLogoutUser }) => {
  const handleRedirect = () => {
    const win = window.open(env.farmhub.webApp, '_blank');
    win.focus();
  };

  const menu = (
    <Menu style={{ width: 300, paddingBottom: 24 }}>
      <CMenuItemHeader key="0">
        <Space direction="vertical">
          <NameText>{user.fullName}</NameText>
          <MiniText>{user.email}</MiniText>
        </Space>
      </CMenuItemHeader>
      <CMenuItem key="1" icon={<UserOutlined />}>
        Thông tin của tôi
      </CMenuItem>
      <CMenuItem onClick={onLogoutUser} key="2" icon={<LogoutOutlined />}>
        Thoát tài khoản
      </CMenuItem>
    </Menu>
  );

  return (
    <Wrapper>
      <LogoBar>
        <Logo src={logo} />
        <Spacing width={10} />
        <WrapperText>
          <LogoText>FarmCheck</LogoText>
        </WrapperText>
      </LogoBar>
      <Space size="large">
        <DivRow>
          <HomeFilled style={{ fontSize: '16px', color: '#39B54A' }} />
          <ButtonLink onClick={handleRedirect} type="link">
            Trang chủ Farm Hub
          </ButtonLink>
        </DivRow>
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
      </Space>
    </Wrapper>
  );
};

HeaderNavbar.propTypes = {
  user: PropTypes.object,
  onLogoutUser: PropTypes.func,
};

export default HeaderNavbar;
