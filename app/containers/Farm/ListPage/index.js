import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from 'global-styles';

import { Input, Space, Empty, Skeleton } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';

import {
  TitleText,
  NormalText,
  NameText,
  Space as Spacing,
  CButton,
  Notification,
  HeaderNavbar,
} from 'components';

import { FarmCard, FarmCardSkeleton } from 'containers/Farm/components';

import { farm as farmQuery } from 'containers/Farm/commons/query';
import { skeletonList } from 'containers/Farm/commons/data';
import { find } from 'containers/Farm/farmSlice';
import { loginForFarm, logoutForUser } from 'containers/Auth/authSlice';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const CInput = styled(Input)`
  min-height: 50px;
  border-radius: 6px;
  box-shadow: none;
  width: 477px !important;
`;

const WrapperCard = styled.div`
  width: auto;
  height: 65%;
  padding-right: 12px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #ffffff;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e0e0e0;
  }
`;

const WrapperContent = styled.div`
  width: 600px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 84px;
`;

const skeleton = skeletonList.map(item => <FarmCardSkeleton key={item.key} />);

const FarmListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const farmList = useSelector(state => state.farm.list);
  const user = useSelector(state => state.auth.user.item);

  const [isLoading, setIsLoading] = useState(true);
  const [filterFarm, setFilterFarm] = useState([]);

  const handleLogoutUser = async () => {
    await dispatch(logoutForUser());
  };

  const handleSearch = e => {
    const keyword = e.target.value;

    const result = farmList.filter(
      item => item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1,
    );

    setFilterFarm(result);
  };

  const handleSelectedFarm = async id => {
    try {
      const actionResult = await dispatch(loginForFarm(id));
      unwrapResult(actionResult);

      history.push('/');
    } catch (error) {
      Notification('error', 'Tải dữ liệu thất bại', error.message);
    }
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

  useEffect(() => {
    setFilterFarm(farmList);
  }, [farmList]);

  return (
    <Wrapper>
      <HeaderNavbar user={user} onLogoutUser={handleLogoutUser} />
      <WrapperContent>
        <TitleText>Chọn nông trại phát triển</TitleText>
        <Spacing height={12} />
        <CInput
          size="large"
          placeholder="Tìm kiếm cửa hàng"
          prefix={<SearchOutlined />}
          onChange={handleSearch}
        />
        <Spacing height={12} />
        <div style={{ width: 477 }}>
          <Space>
            <NameText>Kết quả</NameText>
            {isLoading ? (
              <Skeleton.Input size="small" style={{ width: 100 }} active />
            ) : (
              <NormalText>{`(${filterFarm.length} nông trại)`}</NormalText>
            )}
          </Space>
        </div>
        <Spacing height={12} />
        <WrapperCard>
          {isLoading ? (
            skeleton
          ) : (
            <>
              {filterFarm.length === 0 && (
                <Empty
                  description="Không có nông trại nào"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
              {filterFarm.map(item => (
                <FarmCard
                  key={item.key}
                  item={item}
                  onSelectedFarm={handleSelectedFarm}
                />
              ))}
            </>
          )}
        </WrapperCard>
        <Spacing height={24} />
        <Link to="/farm/create">
          <CButton type="primary" icon={<PlusCircleFilled />}>
            Thêm mới nông trại
          </CButton>
        </Link>
      </WrapperContent>
      <GlobalStyle />
    </Wrapper>
  );
};

export default FarmListPage;
