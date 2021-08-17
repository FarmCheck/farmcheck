import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Space, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import GlobalStyle from 'global-styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { HeaderNavbar, Notification, NameText } from 'components';

import { logoutForUser } from 'containers/Auth/authSlice';
import DetailAccount from 'containers/Account/components/Pages/DetailAccount';
import { find } from 'containers/Farm/farmSlice';
import { farm as farmQuery } from 'containers/Farm/commons/query';

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

const CSpace = styled(Space)`
  position: absolute;
  top: 97px;
  left: 124px;
`;

const AccountDetailPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.auth.user.item);
  const farmList = useSelector(state => state.farm.list);

  const [isLoading, setIsLoading] = useState(true);

  const handleLogoutUser = async () => {
    await dispatch(logoutForUser());
  };

  const initData = async () => {
    setIsLoading(true);
    try {
      const actionResult = await dispatch(
        find({ ...farmQuery, where: { userID: user.id } }),
      );
      const { data } = unwrapResult(actionResult);
      if (data.length === 0) {
        history.push('/farm/create');
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Notification('error', 'Tải dữ liệu thất bại', error.message);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <Wrapper>
      <HeaderNavbar user={user} onLogoutUser={handleLogoutUser} />
      <Link to="/account/list">
        <CSpace>
          <Button
            size="large"
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
          />
          <NameText> Quay lại</NameText>
        </CSpace>
      </Link>
      <WrapperContent>
        <DetailAccount list={farmList} loading={isLoading} url="/farm/create" />
      </WrapperContent>
      <GlobalStyle />
    </Wrapper>
  );
};

export default AccountDetailPage;
