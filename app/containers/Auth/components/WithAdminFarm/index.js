import React, { useEffect } from 'react';
import JWTDecode from 'jwt-decode';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { farm as farmQuery } from 'containers/Farm/commons/query';

import { find, selected as selectedFarm } from 'containers/Farm/farmSlice';
import { refreshAccessTokenForFarm } from 'containers/Auth/authSlice';

const WithAdminFarm = WrappedComponent =>
  function HOC(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth.farm);
    const user = useSelector(state => state.auth.user.item);
    const farm = useSelector(state => state.farm.item);

    const handleSilentRefreshToken = async () => {
      try {
        const actionRefreshTokenResult = await dispatch(
          refreshAccessTokenForFarm(),
        );
        const { data } = unwrapResult(actionRefreshTokenResult);

        if (!farm) {
          const { accessToken } = data;
          const { farmID } = JWTDecode(accessToken);

          const actionFindFarmResult = await dispatch(
            find({ ...farmQuery, where: { userID: user.id } }),
          );
          unwrapResult(actionFindFarmResult);

          dispatch(selectedFarm({ id: farmID }));
        }
      } catch (error) {
        history.push('/login');
      }
    };

    useEffect(() => {
      if (auth.isLogout) {
        history.push('/login');
      }

      if (!auth.isAuthenticated && !auth.isLogout) {
        handleSilentRefreshToken();
      }

      // Silent refresh per 10 minutes
      const intervalRefreshToken = setInterval(
        handleSilentRefreshToken,
        1000 * 60 * 10,
      );

      return () => {
        clearInterval(intervalRefreshToken);
      };
    }, [auth.isAuthenticated, auth.isLogout]);

    return (
      <>
        {auth.isAuthenticated && farm ? <WrappedComponent {...props} /> : null}
      </>
    );
  };

export default WithAdminFarm;
