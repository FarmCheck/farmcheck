import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { Button, Space, Skeleton } from 'antd';

import {
  TitleText,
  NormalText,
  Space as Spacing,
  Notification,
} from 'components';
import { PlusIcon } from 'public/icons';

import FarmCardSkeleton from 'containers/Account/components/Skeletons/FarmCard';
import { skeletonList } from 'containers/Farm/commons/data';
import { loginForFarm } from 'containers/Auth/authSlice';

import farmer from '../images/farmer.png';
import Item from '../Cards/Item';

const Wrapper = styled.div`
  width: 420px;
  height: 610px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;

const WrapperAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(57, 181, 74, 0.2);
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
`;

const CButtonUpdate = styled(Button)`
  width: 225px !important;
  height: 50px !important;
  border-radius: 25px !important;
  font-weight: 700 !important;
  font-size: 16px !important;
`;

const CButton = styled(Button)`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
`;

const WrapperItem = styled.div`
  width: 100%;
  height: 240px;
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

const skeleton = skeletonList.map(item => <FarmCardSkeleton key={item.key} />);

const DetailAccount = ({ url, list, loading = false, setCurrentStep }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCreateAccount = () => {
    if (url) {
      history.push(url);
    } else {
      setCurrentStep(2);
    }
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

  return (
    <Wrapper>
      <WrapperAvatar>
        <Avatar src={farmer} />
      </WrapperAvatar>
      <Spacing height={18} />
      <Space size="middle">
        {loading ? (
          <Skeleton.Input size="small" style={{ width: 100 }} active />
        ) : (
          <TitleText fontSize="18px">
            Nông trại {`(${list.length}/${list.length})`}
          </TitleText>
        )}
        <CButton type="primary" shape="circle" onClick={handleCreateAccount}>
          {' '}
          <PlusIcon width={16} height={16} />{' '}
        </CButton>
      </Space>
      <Spacing height={26} />
      <WrapperItem>
        {loading
          ? skeleton
          : list.map(item => (
              <Item key={item.id} item={item} onSelected={handleSelectedFarm} />
            ))}
      </WrapperItem>
      <Spacing height={18} />
      <div style={{ textAlign: 'center' }}>
        <NormalText>
          Bạn đã đạt giới hạn tài khoản kho chứa. Vui lòng cập nhật để tạo thêm
          tài khoản
        </NormalText>
      </div>
      <Spacing height={12} />
      <CButtonUpdate type="primary">Nâng cấp</CButtonUpdate>
    </Wrapper>
  );
};

DetailAccount.propTypes = {
  url: PropTypes.string,
  list: PropTypes.array,
  loading: PropTypes.bool,
  setCurrentStep: PropTypes.func,
};

export default DetailAccount;
