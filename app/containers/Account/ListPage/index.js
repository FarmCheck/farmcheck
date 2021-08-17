import React from 'react';
import styled from 'styled-components';
import GlobalStyle from 'global-styles';
import { useDispatch, useSelector } from 'react-redux';

import { HeaderNavbar, TitleText, Space as Spacing } from 'components';

import { logoutForUser } from 'containers/Auth/authSlice';
import ListAccount from 'containers/Account/components/Pages/ListAccount';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const WrapperContent = styled.div`
  width: 1100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 106px;
`;

const AccountListPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user.item);

  const handleLogoutUser = async () => {
    await dispatch(logoutForUser());
  };

  return (
    <Wrapper>
      <HeaderNavbar user={user} onLogoutUser={handleLogoutUser} />
      <WrapperContent>
        <TitleText>Lựa chọn các tài khoản</TitleText>
        <Spacing height={24} />
        <ListAccount url="/account/detail" />
      </WrapperContent>
      <GlobalStyle />
    </Wrapper>
  );
};

export default AccountListPage;
